'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/input-field';
import Button from '@/components/button';
import { signup } from '@/utils/auth-actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const signUpSchema = z.object({
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

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmitHandler = async (data: SignUpFormData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);

    signup(formData)
      .then((response) => {
        console.log('RESPONSE:', response);
        if (response.error) {
          console.error(response.error);

          setError('email', { message: response.error });
        }
        toast({
          variant: 'default',
          title: 'Registration Successful',
          description:
            'We have sent you a verification link on the registered email address..',
        });
        router.replace('/login');
      })
      .catch((error) => {
        console.error(error);
        setError('email', { message: error.message });
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
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

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          Register
        </Button>
      </div>
    </form>
  );
}
