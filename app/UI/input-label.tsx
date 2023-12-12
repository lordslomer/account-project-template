import clsx from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {

}

export function InputLabel({ children, className, ...rest }: LabelProps) {
  return (
    <>
      <span className="text-red-500 ml-2 hidden peer-invalid:block">*</span>
      <label
        {...rest}
        className={clsx(
          'text-white text-left transition-colors peer-focus:text-blue-500 peer-hover:text-blue-400'
          , className,)} >
        {children}
      </label>
    </>
  )
}