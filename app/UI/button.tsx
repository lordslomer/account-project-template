import clsx from 'clsx';

export enum c {
  BLUE = 'focus-visible:outline-blue-500 bg-blue-500 hover:bg-blue-400 active:bg-blue-600',
  RED = 'focus-visible:outline-red-500 bg-red-500 hover:bg-red-400 active:bg-red-600',
  GREEN = 'focus-visible:outline-green-500 bg-green-500 hover:bg-green-400 active:bg-green-600',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: c;
}

export function Button({ children, className, variant, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `flex items-center justify-center h-16 px-8 rounded-lg 
        text-white text-lg uppercase
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline
        transition-colors
        shadow-md
        aria-disabled:cursor-not-allowed aria-disabled:opacity-5`,
        variant,
        className,
      )}>
      {children}
    </button>
  );
}
