'use client';
import React, { PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren) {
  return <div className="bg-foreground rounded-xl p-2">{children}</div>;
}
