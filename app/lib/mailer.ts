'use server';
import otpAsciiChars, { verificationEmailHTML } from './utils';
import prisma from './prisma';
import bcrypt from 'bcrypt';
const nodemailer = require('nodemailer');

const generateOTP = () => {
  const possibleAsciiChars = otpAsciiChars;
  const randomizedAsciiChars = [...Array(5).keys()].map(
    () =>
      possibleAsciiChars[Math.floor(Math.random() * possibleAsciiChars.length)]
  );
  return String.fromCharCode(...randomizedAsciiChars);
};

export async function sendVerificationMail(user_id: string) {
  const where = {
    id: user_id,
  };

  //Make sure the time intervales between requests is 1 min.
  const userById = await prisma.user.findUnique({
    where: where,
    select: {
      verifyDate: true,
      email: true,
      username: true,
    },
  });
  if (!userById)
    return {
      msg: 'Failed to send email!',
      success: false,
    };

  const verifyDate = userById.verifyDate;
  const currTime = new Date().getTime();
  if (verifyDate && currTime - verifyDate.getTime() < 60000) {
    const timeToWait = Math.ceil(
      (60000 - currTime + verifyDate.getTime()) / 1000
    );
    return {
      msg: 'Wait before sending again...',
      timeToWait: timeToWait,
      success: false,
    };
  }

  //Generate OTP and update DB with hash+date.
  const otp = generateOTP();
  try {
    await prisma.user.update({
      where: where,
      data: {
        verifyToken: await bcrypt.hash(otp, 5),
        verifyDate: new Date(),
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMPT_LOGIN,
        pass: process.env.SMPT_KEY,
      },
    });

    console.log(otp)
    // await transporter.sendMail({
    //   from: '"WiseSpend" <wisespend@salamski.pro>',
    //   to: userById.email,
    //   subject: 'WiseSpend | Verification Code',
    //   text: `Hello ${userById.username}
    //   \nHere is your verification code:
    //   \n${otp}
    //   \nWelcome To WiseSpend.`,
    //   html: verificationEmailHTML(userById.username, otp),
    // });

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      msg: 'Failed to send email!',
      success: false,
    };
  }
}
