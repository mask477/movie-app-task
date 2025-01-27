'use client';
import React from 'react';

import SignInForm from '@/components/sign-in-form';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="grid gap-8 justify-center">
      <h1 className="text-h1 text-center">Sign in</h1>

      <SignInForm />

      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={() => router.replace('register')}
      >
        Register
      </Button>
    </div>
  );
}
