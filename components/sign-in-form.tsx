'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/input-field';
import Button from './button';
import { useRouter } from 'next/navigation';
import { login } from '@/app/login/actions';

const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .nonempty('Password is required'),
  // rememberMe: z.any(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmitHandler = (data: SignInFormData) => {
    console.log('Form Submitted:', data);

    // const formData = new FormData();

    // formData.append('email', data.email);
    // formData.append('password', data.password);

    setLoading(true);

    login(data)
      .then((response) => {
        console.log('RESPIONSE:', response);
        if (response.error) {
          setError('email', { message: response.error });
        }
      })
      .catch((error) => {
        setError('email', { message: error.message });
      })
      .finally(() => {
        setLoading(false);
      });

    // Perform sign-in logic here
    // onSubmit(formData);
  };

  const onClickRegisterHandler = () => {
    router.push('/register');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full min-w-[350px] flex flex-col gap-2 items-center justify-center"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Email Field */}
        <InputField
          {...register('email')}
          error={errors.email?.message}
          type="email"
          placeholder="Email"
          disabled={loading}
        />

        {/* Password Field */}
        <InputField
          {...register('password')}
          type="password"
          error={errors.password?.message}
          placeholder="Password"
          disabled={loading}
        />

        {/* {!!error && <p className="text-error">{error}</p>} */}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          Login
        </Button>
      </div>
    </form>
  );
}
