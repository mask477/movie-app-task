// app/movies/actions.ts
'use server';

import { createClient } from '@/utils/supabase/server';

// Get all movies
export async function getMovies(page: any = 1): Promise<
  | {
      data: Movie[];
      meta: PaginationMeta;
    }
  | { error: string }
> {
  console.log('getMovies()');
  const supabase = createClient();

  try {
    try {
      page = parseInt(page);
      if (isNaN(page)) {
        page = 1;
      }
    } catch (error) {
      page = 1;
    }

    console.log('PAGE:', page);

    const limit = 8;

    // Parse page and limit as integers
    const pageNumber = page;
    const pageSize = limit;

    // Calculate range for Supabase
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Fetch movies with pagination
    const { data, error, count } = await (
      await supabase
    )
      .from('movies')
      .select('*', { count: 'exact' }) // Get the total count for pagination
      .order('created_at', {
        ascending: false,
      })
      .range(from, to);

    const totalCount = count ? count : 0;

    if (error) {
      return { error: error.message };
    }

    const movies: Movie[] = data.map((movie: Movie) => movie);

    // Send the paginated results
    return {
      data: movies,
      meta: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error(error);
    return { error: 'Something went wrong.' };
  }
}

// Get a movie by ID
export async function getMovieById(
  id: string
): Promise<Movie | { error: string }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching movie:', error.message);
    return { error: 'Movie not found' };
  }

  return data;
}

// Create a new movie
export async function createMovie(data: {
  poster: File;
  title: string;
  year: number;
}) {
  const supabase = await createClient();

  const user = await (await supabase).auth.getUser(); // Get current user
  if (!user) {
    throw new Error('User not authenticated');
  }

  console.log('USER:', user);

  const userId = (await user).data.user?.id;

  console.log('USER ID:', userId);

  const posterFile = data.poster;
  const fileName = `${userId}-${Date.now()}-${posterFile.name}`; // Unique file name
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('posters')
    .upload(fileName, posterFile);

  if (uploadError) {
    console.error('Error uploading poster:', uploadError.message);
    throw new Error(uploadError.message);
  }

  const { data: storageData } = supabase.storage
    .from('posters')
    .getPublicUrl(uploadData.path);

  const { publicUrl } = storageData;
  console.log('StorageData:', storageData.publicUrl);

  const movieData = {
    title: data.title,
    year: data.year,
    poster: publicUrl, // Save the public URL in the database
    user_id: userId, // Link the movie to the current user
  };

  const { error: insertError } = await supabase
    .from('movies')
    .insert(movieData);

  if (insertError) {
    console.error('Error creating movie:', insertError.message);
    throw new Error(insertError.message);
  }

  return { message: 'New movie created' };
}

// Update a movie
export async function updateMovie(
  id: string,
  data: {
    poster?: File | null;
    title: string;
    year: number;
  }
) {
  const supabase = await createClient();

  const user = await (await supabase).auth.getUser(); // Get current user
  if (!user) {
    throw new Error('User not authenticated');
  }

  const userId = (await user).data.user?.id;

  let movieData: any = {
    title: data.title,
    year: data.year,
    user_id: userId, // Link the movie to the current user
  };

  // Upload poster only if the poster is a File
  if ('poster' in data && data.poster instanceof File) {
    const posterFile = data.poster;
    const fileName = `${userId}-${Date.now()}-${posterFile.name}`; // Unique file name
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('posters')
      .upload(fileName, posterFile);

    if (uploadError) {
      console.error('Error uploading poster:', uploadError.message);
      throw new Error(uploadError.message);
    }

    const { data: storageData } = supabase.storage
      .from('posters')
      .getPublicUrl(uploadData.path);

    // TODO: need to Delete the old file

    movieData.poster = storageData.publicUrl;
  }

  const { error: updateError } = await supabase
    .from('movies')
    .update(movieData)
    .eq('id', id);

  if (updateError) {
    console.error('Error creating movie:', updateError.message);
    throw new Error(updateError.message);
  }

  return { message: 'Movie updated successfully' };
}

// Delete a movie
export async function deleteMovie(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('movies').delete().eq('id', id);

  if (error) {
    console.error('Error deleting movie:', error.message);
    throw new Error(error.message);
  }
}
