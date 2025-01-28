import LinkButton from '@/components/link-button';
import React from 'react';

export default function EmptyList() {
  return (
    <div className="flex flex-col w-full justify-center gap-4">
      <h1 className="text-h1 text-center">Your movie list is empty</h1>

      <LinkButton href={'/movies/create'} prefetch>
        Add a new movie
      </LinkButton>
    </div>
  );
}
