import clsx from 'clsx';
import { useState } from 'react';
import { InputLabel } from './input-label';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string,
  errors?: string[]
}

export function Input({ className, type, label, errors, id, ...rest }: InputProps) {
  const PasswordIcon = () => (showPassword ? (
    <EyeSlashIcon onClick={handleClickShowPassword} className="
    right-10 md:right-20
    absolute w-8 h-8 
    cursor-pointer
    "/>
  ) : (
    <EyeIcon onClick={handleClickShowPassword} className="
    right-10 md:right-20
    absolute w-8 h-8 
    cursor-pointer
    "/>
  ))
  //UI
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div className='space-y-2'>
      <div className='flex flex-row-reverse justify-end flex-wrap-reverse'>
        <input
          id={id}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
          {...rest}
          className={clsx(`
          peer w-full text-white py-1 pl-2 pr-9 
          transition-colors bg-transparent border-b-2
          focus-visible:outline-none grow placeholder-bg-3
          focus:border-b-blue-500 hover:border-b-blue-400
          `,
            className,
          )}
        />
        <InputLabel htmlFor={id}>{label}</InputLabel>
        {type === 'password' && <PasswordIcon />
        }
      </div>
      <div className='space-y-1 text-left'>
        {errors && errors.map(err => (
          <p className="text-red-500 text-sm" key={err}>{err}</p>
        ))}
      </div>
    </div>
  );

}