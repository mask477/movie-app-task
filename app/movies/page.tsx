'use client';

import Button from '@/components/button';
import Movie from '@/components/movie';
import { MovieType } from '@/lib/constants';
import { CirclePlus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovies } from './actions';

// function getMovies(): MovieType[] {
//   return MOVIES;
// }

export default function Home() {
  const router = useRouter();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>(1);
  // const movies = getMovies();

  useEffect(() => {
    getMovies()
      .then((response) => {
        console.log('MOBVIES RES:', response);
        setMovies(response.data);
        setPage(response.meta.page);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onClickAddMovie = () => {
    router.push('/movies/create');
  };

  return (
    <div className="grid gap-16">
      {movies.length ? (
        <>
          <div className="flex flex-wrap justify-between w-full">
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-h2">My movies</h1>
              <CirclePlus size={32} />
            </div>

            <Link
              href={'/sign-in'}
              className="flex items-center gap-2 font-bold text-sm"
            >
              <label className="text-base">Logout</label>
              <LogOut size={32} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <Movie key={movie.id} {...movie} />
            ))}
          </div>

          <div className="flex justify-center py-8 w-full my-8">
            <div className="flex gap-4 ">
              <label className="cursor-pointer">Prev</label>
              <label className="cursor-pointer">1</label>
              <label className="cursor-pointer">2</label>
              <label className="cursor-pointer">Next</label>
            </div>
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
