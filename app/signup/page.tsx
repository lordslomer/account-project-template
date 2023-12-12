"use client";
import { emailSchema, passSchema, userSchema } from "../lib/validation-schemas";
import { createUser } from "../lib/actions";
import { useFormState } from "react-dom";
import { useState } from "react";
import Link from 'next/link';
import { z } from "zod";
import { Input } from "../UI/input";
import { Button, c } from "../UI/button";

type Errors = {
  username?: string[] | undefined;
  email?: string[] | undefined;
  pass?: string[] | undefined;
}

export default function SignUpPage() {
  const SingUpForm = () => {
    //Input
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    //Form
    const [error_code, dispatch] = useFormState(createUser, undefined);
    const [errors, setErrors] = useState<Errors>({});
    const handleSubmit = () => {
      const parsedFields = z
        .object({
          username: userSchema,
          email: emailSchema,
          pass: passSchema,
        })
        .safeParse({ username, email, pass });
      if (parsedFields.success) {
        dispatch({ username, email, pass });
      } else {
        const newErrors = parsedFields.error.flatten().fieldErrors;
        setErrors(newErrors)
      }
    };
    return (
      <form autoComplete="off" action={handleSubmit} noValidate className="flex justify-around items-center md:h-screen">
        <div className="relative mx-auto w-full max-w-[500px] bg-1 flex flex-col rounded-md shadow-xl text-lg text-center py-12 md:px-20 px-10 space-y-8">

          <h1 className="text-4xl">Signup</h1>

          <div className="space-y-8">
            <Input
              autoComplete="off"
              placeholder="BestUser42"
              errors={errors.username}
              value={username}
              label="Username"
              name="username"
              id="username"
              type="text"
              required
              onChange={(e) => {
                const inputText = e.target.value.trim()
                if (errors.username && userSchema.safeParse(inputText).success)
                  errors.username = undefined
                setUsername(inputText)
              }}
            />

            <Input
              autoComplete="off"
              placeholder="user@example.com"
              value={email}
              label="Email"
              name="email"
              type='email'
              id="email"
              required
              errors={errors.email}
              onChange={(e) => {
                const inputText = e.target.value.trim()
                if (errors.email && emailSchema.safeParse(inputText).success)
                  errors.email = undefined
                setEmail(inputText)
              }}
            />

            <Input
              autoComplete="off"
              label="Password"
              placeholder="* * * * * * * *"
              type='password'
              id="password"
              value={pass}
              name="pass"
              required
              errors={errors.pass}
              onChange={(e) => {
                const inputText = e.target.value.trim()
                if (errors.pass) {
                  const parsedInput = passSchema.safeParse(inputText)
                  if (parsedInput.success)
                    errors.pass = undefined
                  else
                    errors.pass = parsedInput.error?.flatten().formErrors
                }
                setPass(inputText)
              }}
            />
          </div>

          <div className="flex flex-col space-y-2">
            {error_code && <p className="text-red-500">{error_code}</p>}
            <Button variant={c.BLUE} type='submit'>SIGN UP</Button>
          </div>

          <div className="flex flex-col">
            <p>Already have an account?</p>
            <Link className="text-blue-500" href='/login'>Log In</Link>
          </div>
          <Link href='/' className="text-left text-blue-500">Back</Link>
        </div>
      </form >
    )
  }
  return (
    <SingUpForm />
  );
}