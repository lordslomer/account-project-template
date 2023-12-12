"use client";
import { authenticate } from "../lib/actions";
import { useFormState } from "react-dom";
import { Button, c } from "../UI/button";
import Link from 'next/link';
import { Input } from "../UI/input";

export default function LoginPage() {
  //Form
  const [error_code, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} autoComplete="off" noValidate className="flex justify-around items-center md:h-screen">
      <div className="relative mx-auto w-full max-w-[500px] bg-1 flex flex-col rounded-md shadow-xl text-lg text-center py-12 md:px-20 px-10 space-y-8">
        <h1 className="text-4xl">Login</h1>

        <div className="space-y-8">
          <Input
            autoComplete="off"
            placeholder="user@example.com"
            label="Email or Username"
            name="identifier"
            id="identifier"
            required
          />
          <Input
            autoComplete="off"
            placeholder="* * * * * * * *"
            label="Password"
            type='password'
            id="password"
            name="pass"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          {error_code && <p className="text-red-500">{error_code}</p>}
          <Button variant={c.BLUE} type='submit'>log in</Button>
        </div>

        {/* TODO add forget pass link */}

        <div className="flex flex-col">
          <p>Don&apos;t have an account?</p>
          <Link className="text-blue-500" href='/signup'>Sign Up</Link>
        </div>

        <Link href='/' className="text-left text-blue-500">Back</Link>
      </div>
    </form>
  )
}