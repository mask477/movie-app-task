'use client';
import React from 'react';
// import CreateMovieForm from './components/create-movie-form';
import dynamic from 'next/dynamic';

const CreateMovieForm = dynamic(
  () => import('./components/create-movie-form'),
  { ssr: false }
);

export default function CreateMovie() {
  return (
    <div className="w-full">
      <CreateMovieForm />
    </div>
  );
}
