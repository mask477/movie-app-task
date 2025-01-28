import React from 'react';

import SignUpForm from './components/sign-up-form';
import LinkButton from '@/components/link-button';

export default function RegisterPage() {
  return (
    <div className="grid gap-8 justify-center">
      <h1 className="text-h1 text-center">Register</h1>

      <div className="max-w-[350px]">
        <SignUpForm />
      </div>

      <LinkButton
        variant="outline"
        type="button"
        className="w-full"
        href={'/login'}
        prefetch
      >
        Login
      </LinkButton>
    </div>
  );
}
