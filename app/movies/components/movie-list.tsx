'use client';

import LogoutButton from '@/components/logout-button';
import Movie from '@/components/movie';
import Pagination from '@/components/pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import EmptyList from './empty-list';

export default function MovieList({
  data,
}: {
  data:
    | {
        data: Movie[];
        meta: PaginationMeta;
      }
    | {
        error: string;
      };
}) {
  const isMobile = useIsMobile();

  if ('error' in data) {
    return <EmptyList />;
  }

  const { data: movies, meta } = data;
  return movies.length ? (
    <>
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex items-center gap-4 font-bold">
          <h1 className="text-h3 sm:text-h2">My movies</h1>
          <Link href="/movies/create" prefetch>
            <CirclePlus size={isMobile ? 24 : 32} />
          </Link>
        </div>

        <LogoutButton />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-4">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>

      <div className="flex justify-center py-8 w-full my-8">
        <Pagination meta={meta} />
      </div>
    </>
  ) : (
    <EmptyList />
  );
}
