'use client';
import { cn } from '@/utils/functions';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn([
        'bg-foreground rounded-xl p-2 overflow-hidden',
        className,
      ])}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn(['px-2 py-2 ', className])} {...props}>
      {children}
    </div>
  );
}

export { Card, CardBody };
