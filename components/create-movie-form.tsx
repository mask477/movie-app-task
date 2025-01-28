'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import InputField from './input-field';
import { useForm } from 'react-hook-form';
import { setErrorMap, z } from 'zod';
import Button from './button';
import { ImageField } from './image-field';
import { createMovie } from '@/app/movies/actions';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const createMovieSchema = z.object({
  poster: z
    .instanceof(File) // Ensure the input is a file list (the value of a file input)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Please upload a valid image.',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB max size
      message: 'File size must be less than 5MB.',
    }),
  title: z.string().nonempty('Title is required'),
  year: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(18, 'Must be 18 and above')
  ),
});

type CreateMovieFormData = z.infer<typeof createMovieSchema>;

export default function CreateMovieForm() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CreateMovieFormData>({
    resolver: zodResolver(createMovieSchema),
  });

  const [title, year, poster] = watch(['title', 'year', 'poster']);

  useEffect(() => {
    console.log('TITLE:', { title, year, poster });
  }, [title, year, poster]);

  const onSubmitHandler = (data: CreateMovieFormData) => {
    console.log('onSubmitHandler');

    console.log('DATA:', data);

    setLoading(true);
    setError(null);
    createMovie(getValues())
      .then((response) => {
        console.log('RESPONSE:', response);
      })
      .catch((error) => {
        console.error('ERROR:', error);
        console.log('ERROR:', error.message);
        setError(error.message);
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

          <div className="max-w-xs">
            <InputField
              {...register('year')}
              error={errors.year?.message}
              type="number"
              placeholder="Publishing Year"
              disabled={loading}
            />
          </div>

          {!!error && <p className="text-error">{error}</p>}
          {!isMobile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
              <Button disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </div>
          )}
        </div>
        {isMobile && (
          <div className="order-3 grid grid-cols-2 gap-4 mt-8">
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
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
