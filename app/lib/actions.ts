'use server';
import { emailSchema, passSchema, userSchema } from './validation-schemas';
import { auth, signIn, signOut } from '@/auth';
import prisma from './prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sendVerificationMail } from './mailer';

export async function createUser(
  prevState: string | undefined,
  formData: { username: string; email: string; pass: string }
) {
  const parsedFields = z
    .object({
      username: userSchema,
      email: emailSchema,
      pass: passSchema,
    })
    .safeParse(formData);

  if (!parsedFields.success) return 'Invalid Input!';

  const { email, username, pass } = parsedFields.data;
  const hashedPass = await bcrypt.hash(pass, 5);

  try {
    const emailExists = (await prisma.user.count({ where: { email } })) > 0;
    if (emailExists) return 'Account Already Exists For This Email';

    const userNameExists =
      (await prisma.user.count({
        where: {
          username: {
            equals: username,
            mode: 'insensitive',
          },
        },
      })) > 0;
    if (userNameExists) return 'Account Already Exists For This Username';

    const user = await prisma.user.create({
      data: { email, pass: hashedPass, username },
    });

    try {
      await signIn('credentials', {
        id: user.id,
        isVerified: user.isVerified,
        redirect: false,
      });

      await sendVerificationMail(user.id);
    } catch (error) {
      console.log(error);
      return 'Failed to Create Account.';
    }
  } catch (error) {
    console.log(error);
    return 'Failed to Create Account.';
  }
  revalidatePath('/');
  redirect('/');
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: '/' });
  revalidatePath('/');
  redirect('/');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const input = Object.fromEntries(formData);
  const err = 'Invalid Credentials!';

  //default to email
  let type = 0;
  let parsedIdentifier = emailSchema.safeParse(input.identifier);

  if (!parsedIdentifier.success) {
    //if not email, fallback on username
    type = 1;
    parsedIdentifier = userSchema.safeParse(input.identifier);
    if (!parsedIdentifier.success) return err;
  }

  const parsedPass = passSchema.safeParse(input.pass);
  if (!parsedPass.success) return err;

  const identifier = parsedIdentifier.data;
  const pass = parsedPass.data;

  //No such user
  let user = null;
  if (type === 0) {
    user = await prisma.user.findUnique({
      where: { email: identifier },
    });
  } else {
    user = await prisma.user.findFirst({
      where: {
        username: {
          equals: identifier,
          mode: 'insensitive',
        },
      },
    });
  }
  if (!user) return err;

  //wrong password
  const match = await bcrypt.compare(pass, user.pass);
  if (!match) return err;
  try {
    await signIn('credentials', {
      id: user.id,
      isVerified: user.isVerified,
      redirect: false,
    });
  } catch (error) {
    if ((error as Error).message.includes('credentialssignin')) return err;
  }
  revalidatePath('/');
  redirect('/');
}

export async function validateUser(otp: string) {
  const session = await auth();
  if (!(session && session.user)) return { msg: 'Not Signed In!' };
  const where = {
    id: session.user.id,
  };
  const err = { msg: 'Code expired!' };
  try {
    const user = await prisma.user.findUnique({
      where: where,
      select: {
        isVerified: true,
        verifyDate: true,
        verifyToken: true,
      },
    });
    if (!(user && !user.isVerified && user.verifyDate && user.verifyToken))
      return err;

    const expiryDate = user.verifyDate.getTime() + 300000;
    const currTime = new Date().getTime();
    if (currTime > expiryDate) return err;

    const parsedOtp = z
      .string()
      .regex(new RegExp('^[A-Z0-9]{5}$'))
      .safeParse(otp);
    if (
      !(
        parsedOtp.success &&
        (await bcrypt.compare(parsedOtp.data, user.verifyToken))
      )
    )
      return err;

    await prisma.user.update({
      where: where,
      data: {
        isVerified: true,
        verifyDate: null,
        verifyToken: null,
      },
    });
  } catch (error) {
    console.log(error);
    return err;
  }
  await signOut({ redirect: false });
  await signIn('credentials', {
    id: session.user.id,
    isVerified: true,
    redirect: true,
  });
}
