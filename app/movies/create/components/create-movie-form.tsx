'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import InputField from '@/components/input-field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/button';
import { ImageField } from '@/components/image-field';
import { createMovie } from '@/app/movies/actions';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import LinkButton from '@/components/link-button';

const createMovieSchema = z.object({
  poster: z
    .instanceof(File) // Ensure the input is a file (the value of a file input)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Please upload a valid image.',
    })
    .refine((file) => file.size <= 1024 * 1024, {
      // 1MB max size
      message: 'File size must be less than 1MB.',
    }),
  title: z.string().nonempty('Title is required'),
  year: z.coerce
    .number() // Force it to be a number
    .int() // Make sure it's an integer
    .gte(1), // Greater than or equal to the smallest 5 digit int,
});

type CreateMovieFormData = z.infer<typeof createMovieSchema>;

export default function CreateMovieForm() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CreateMovieFormData>({
    resolver: zodResolver(createMovieSchema),
  });

  const onSubmitHandler = (data: CreateMovieFormData) => {
    console.log('onSubmitHandler');

    console.log('DATA:', data);

    setLoading(true);
    createMovie(getValues())
      .then((response) => {
        console.log('RESPONSE:', response);
        toast({
          title: 'Success',
          description: response.message,
        });
        router.replace('/movies');
      })
      .catch((error) => {
        console.error('ERROR:', error);
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
    <div className="w-full">
      <h1 className="text-h2 mb-20">Create a new movie</h1>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="w-full order-2 sm:order-1 sm:max-w-md">
          <ImageField
            {...register('poster')}
            error={errors.poster?.message}
            disabled={loading}
            setValue={setValue}
          />
        </div>
        <div className="flex order-1 sm:order-2 flex-col gap-2">
          <InputField
            {...register('title')}
            error={errors.title?.message}
            type="text"
            placeholder="Title"
            disabled={loading}
          />

          <div className="sm:max-w-xs w-full">
            <InputField
              {...register('year')}
              error={errors.year?.message}
              type="number"
              placeholder="Publishing Year"
              disabled={loading}
            />
          </div>

          {isMobile !== undefined && !isMobile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <LinkButton
                href="/movies"
                variant="outline"
                disabled={loading}
                prefetch
              >
                Cancel
              </LinkButton>
              <Button disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </div>
          )}
        </div>
        {isMobile !== undefined && isMobile && (
          <div className="order-3 grid grid-cols-2 gap-4 mt-8">
            <LinkButton
              href="/movies"
              variant="outline"
              disabled={loading}
              type="button"
              prefetch
            >
              Cancel
            </LinkButton>
            <Button disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
