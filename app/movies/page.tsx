'use client';

import Button from '@/components/button';
import Movie from '@/components/movie';
import { CirclePlus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovies } from './actions';
import Pagination from '@/components/pagination';
import LogoutButton from '@/components/logout-button';
import Link from 'next/link';
import MoviesSkeleton from '@/components/movies-skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Home() {
  const isMobile = useIsMobile();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 10,
    totalPages: 1,
  });
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  useEffect(() => {
    setLoading(true);
    getMovies(pageParam)
      .then((response) => {
        console.log('MOVIES RES:', response);
        if ('data' in response) {
          setMovies(response ? response.data : []);
          setPaginationMeta(response.meta);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageParam]);

  const onClickAddMovie = () => {
    router.push('/movies/create');
  };

  return (
    <div className="grid gap-16">
      {loading ? (
        <MoviesSkeleton />
      ) : movies.length ? (
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
            <Pagination meta={paginationMeta} />
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full justify-center gap-4">
          <h1 className="text-h1 text-center">Your movie list is empty</h1>

          <Button onClick={onClickAddMovie}>Add a new movie</Button>
        </div>
      )}
    </div>
  );
}
