import { cn } from '@/utils/functions';
import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { Url } from 'url';

type LinkButtonProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    className?: string;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
  };

export default function LinkButton({
  children,
  className,
  disabled = false,
  href,
  variant = 'primary',
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn([
        'p-4 rounded-[10px] text-white font-md font-bold  transition flex justify-center items-center',
        variant === 'primary'
          ? 'bg-primary hover:bg-primary-400'
          : 'border-muted text-white border-2 hover:bg-primary-400 hover:text-white hover:bg-primary',
        disabled ? 'opacity-50' : '',
        className,
      ])}
      {...props}
    >
      {children}
    </Link>
  );
}
