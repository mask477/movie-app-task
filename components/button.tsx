'use client';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export default function Button({
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return <button {...props} />;
}
