import { Suspense } from 'react';
import MovieList from './components/movie-list';
import MoviesSkeleton from '@/components/movies-skeleton';
import { getMovies } from './actions';

type tParams = Promise<{ page?: string }>;

export default async function MoviesPage(props: { searchParams: tParams }) {
  const page = parseInt((await props.searchParams).page || '1', 10);

  const moviesData = await getMovies(page);
  return (
    <div className="grid gap-16">
      <Suspense fallback={<MoviesSkeleton />}>
        <MovieList data={moviesData} />
      </Suspense>
    </div>
  );
}
