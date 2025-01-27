'use client';
import React, { useState } from 'react';

import { signup } from './actions';
import SignInForm from '@/components/sign-in-form';
import Button from '@/components/button';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmitHandler = (formData: FormData) => {
    setError(null);
    signup(formData)
      .then((res) => {
        console.log('LOGIN FORM RES:', res);

        if (res.error) {
          setError(res.error);
        }
      })
      .catch((error) => {
        console.log('LOGIN ERROR RES:', error);
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="max-w-[3500px]">
        <h1 className="text-h1">Register</h1>
        <SignInForm onSubmit={onSubmitHandler} error={error} />

        {/* Submit Button */}
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => router.replace('login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
