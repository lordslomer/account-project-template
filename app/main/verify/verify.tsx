"use client"
import { sendVerificationMail } from "../../lib/mailer";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Button, c } from "@/app/UI/button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ClockLoader } from "react-spinners";
import { OtpInput } from "@/app/UI/input-otp";

export default function VerifyPage({ user_id }: { user_id: string | undefined; }) {

  const SendEmailForm = () => {
    const [secAfterSent, setSecAfterSent] = useState(0);
    const [emailRes, emailDispatch] = useFormState(sendVerificationMail.bind(null, user_id || ""), { success: false, msg: '' });

    //Send Email Form
    useEffect(() => {
      if (emailRes.success) setSecAfterSent(60);
      else if (!emailRes.success && emailRes.timeToWait) setSecAfterSent(emailRes.timeToWait)
    }, [emailRes]);

    //Count-down Timer
    useEffect(() => {
      const interval = setInterval(() => {
        if (secAfterSent > 0) setSecAfterSent(secAfterSent - 1);
        else {
          emailRes.timeToWait = undefined
          emailRes.success = false
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [secAfterSent, emailRes]);
    return (
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-500">Can&apos;t find it ?</p>
        <form action={emailDispatch}>
          <Button
            variant={c.BLUE}
            className="
            text-base md:flex-none space-x-2 max-md:h-8
            disabled:bg-bg-2 disabled:border-2 
            disabled:cursor-not-allowed disabled:text-bg-3"
            disabled={secAfterSent > 0}
            type="submit">
            {secAfterSent > 0 ? (
              <>
                <ClockLoader size={25} color="#484848" />
                <p>{secAfterSent}</p>
              </>
            ) : (
              <>
                <p className="hidden md:block">Resend</p>
                <PaperAirplaneIcon className="w-6 h-6" />
              </>
            )}
          </Button>
        </form>

        {secAfterSent > 0 && (
          emailRes.success ? (
            <p className="text-green-500">Email sent.</p>
          ) : (
            <p className="text-red-500">{emailRes.msg}</p>
          )
        )
        }
      </div>
    )
  }
  return (
    <div className=" flex justify-center items-center md:h-full">
      <div className={`
        md:px-8 px-4 py-12 bg-1
        flex flex-col
        text-center
        space-y-12
        w-full
        md:w-[700px]
        lg:px-24
        `}>
        <div className="flex flex-col items-center space-y-4">
          <h1 className="md:text-4xl text-2xl">Verify Your Account</h1>
          <p className="text-gray-500">Check your inbox and spam.</p>
        </div>

        <OtpInput />

        <SendEmailForm />
      </div >
    </div>
  );
}