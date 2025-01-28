import React from 'react';

import LinkButton from '@/components/link-button';
import LoginInForm from './components/login-form';

export default function LoginPage() {
  return (
    <div className="grid gap-8 justify-center">
      <h1 className="text-h1 text-center">Sign in</h1>

      <div className="max-w-[350px]">
        <LoginInForm />
      </div>

      <LinkButton
        variant="outline"
        type="button"
        className="w-full"
        href={'/register'}
        prefetch
      >
        Register
      </LinkButton>
    </div>
  );
}
