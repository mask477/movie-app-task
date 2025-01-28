'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/input-field';
import Button from '@/components/button';
import { login } from '@/utils/auth-actions';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .nonempty('Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function LoginInForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const { toast } = useToast();

  const onSubmitHandler = (data: SignInFormData) => {
    console.log('Form Submitted:', data);

    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);

    setLoading(true);

    login(formData)
      .then((response) => {
        if ('error' in response) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.message !== 'NEXT_REDIRECT') {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        }
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

        <div className="flex items-center justify-center space-x-2 mb-6">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          Login
        </Button>
      </div>
    </form>
  );
}
