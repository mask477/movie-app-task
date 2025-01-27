'use client';
import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export default function Button({
  className,
  variant = 'primary',
  disabled,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'primary' | 'outline';
}) {
  return (
    <button
      {...props}
      className={cn([
        'p-4 rounded-[10px] text-white font-md font-bold  transition flex justify-center items-center',
        variant === 'primary'
          ? 'bg-primary hover:bg-primary-400'
          : 'border-primary border-2 hover:bg-primary-400 text-primary hover:text-white hover:bg-primary',
        disabled ? 'opacity-50' : '',
        className,
      ])}
    />
  );
}
