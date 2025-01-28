import EditMovieForm from './components/edit-movie-form';
import { getMovieById } from '../../actions';
import { ServerCrash } from 'lucide-react';
import LinkButton from '@/components/link-button';

export default async function EditMoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const movie = await getMovieById(id);

  if ('error' in movie) {
    return (
      <div className="w-full flex justify-center">
        <div className="max-w-sm">
          <div className="flex gap-4 flex-col items-center mb-8">
            <ServerCrash size={40} />
            <h3 className="text-h3">Oops!</h3>
            <p className="text-base">Something went wrong!</p>
          </div>
          <LinkButton href="/movies" className="w-full">
            Back
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <EditMovieForm movie={movie} />
    </div>
  );
}
