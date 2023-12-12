import { validateUser } from '../lib/actions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { use, useEffect, useState } from 'react';

interface OtpProps {
  errors?: string[],
}
const style = `
text-4xl uppercase text-center
transition-colors bg-transparent border-b-2
focus-visible:outline-none  placeholder-bg-3
focus:border-b-blue-500 hover:border-b-blue-400
invaild:border-b-red-500
`
export function OtpInput() {
  const [otp, setOtp] = useState('');
  const [verifyError, verifyDispatch] = useFormState(validateUser.bind(null, otp), undefined);
  useEffect(() => {
    if (otp.length === 5) verifyDispatch();
  }, [otp, verifyDispatch])
  return (
    <div className='space-y-2'>
      <input
        pattern="[A-Z0-9]{0,5}"
        className={clsx(style, `md:w-5/12 w-8/12`)}
        id='optinput'
        placeholder="XXXXX"
        autoComplete="off"
        maxLength={5}
        value={otp}
        autoFocus
        size={5}
        onChange={(event) => {
          const input = event.target.value.toUpperCase()
          if (/^[A-Z0-9]{0,5}$/.test(input)) setOtp(input);
          if (verifyError?.msg) verifyError.msg = '';
        }}
      />
      {verifyError?.msg && <p className="text-red-500 text-sm">{verifyError?.msg}</p>}
    </div >
  );

}