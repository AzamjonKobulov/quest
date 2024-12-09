import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <span className="relative w-full">
        {props.required && (
          <span className="absolute bottom-[17px] right-[17px] top-[17px] text-2xl font-black leading-[29px] text-[#121212]/50">
            *
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex h-[63px] w-full rounded-[14px] bg-[#EEE] px-5 py-[17px] font-inter text-2xl leading-[29px] text-[#121212] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-[#121212]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </span>
    );
  }
);
Input.displayName = 'Input';

export { Input };
