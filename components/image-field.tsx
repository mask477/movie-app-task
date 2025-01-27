/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react';
import Image from 'next/image';
import React, {
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

export function ImageField({
  error,
  disabled,
  setValue,
}: // ...props
UseFormRegisterReturn & {
  error?: string;
  disabled: boolean;
  setValue: UseFormSetValue<{ poster: File; title: string; year: number }>;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image drop and update form
  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setValue('poster', acceptedFiles[0], {
        shouldValidate: true,
      });
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*' as unknown as Accept,
    disabled: disabled,
  });

  const inputProps = getInputProps();

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className="cursor-pointer flex flex-col justify-center items-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg min-h-[500px]"
      >
        <input
          {...inputProps}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled}
        />
        {!imagePreview ? (
          <p className="text-center text-gray-500">
            Drag & drop an image here, or click to select one
          </p>
        ) : (
          <Image
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
            width={300}
            height={300}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
