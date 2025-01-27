'use client';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn(['bg-foreground rounded-xl p-2', className])} {...props}>
      {children}
    </div>
  );
}

function CardBody({ children }: PropsWithChildren) {
  return <div className="px-2 py-2">{children}</div>;
}

export { Card, CardBody };
