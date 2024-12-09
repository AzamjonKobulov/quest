'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { label: string }
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'flex max-w-[130px] items-center justify-center rounded-[14px] border border-[#121212]/50 py-[17px] font-inter text-2xl leading-[29px] text-[#121212]/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:border-transparent aria-checked:bg-yellow-500 aria-checked:bg-gradient-to-b aria-checked:from-brand-main aria-checked:to-[#F6A819] aria-checked:font-semibold aria-checked:text-white dark:text-zinc-50 dark:focus-visible:ring-zinc-300',
        className
      )}
      {...props}
    >
      <span>{label}</span>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
