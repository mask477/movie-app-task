// app/movies/actions.ts
'use server';

import { createClient } from '@/lib/supabase/client';
// import { createClient } from '@/lib/supabase/server';

import { redirect } from 'next/navigation';

// Get all movies
export async function getMovies(page = 1, pageSize = 10) {
  console.log('getMovies()');
  const supabase = createClient();

  const { data: movies, error } = await supabase
    .from('movies')
    .select('*')
    .range((page - 1) * pageSize, page * pageSize - 1);

  console.log('getMovies():', movies);
  // const { data, error } = await supabase.from('movies').select('*').range(0,);

  if (error) {
    console.error('Error fetching movies:', error.message);
    throw new Error(error.message);
  }

  return {
    data: movies,
    meta: {
      page: 1,
      nextPage: '',
      prevPage: '',
    },
  };
}

// Create a new movie
export async function createMovie(data: {
  poster: File;
  title: string;
  year: number;
}) {
  const supabase = await createClient();

  const user = await supabase.auth.getUser(); // Get current user
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

  return redirect('/movies');
}

// Get a movie by ID
export async function getMovieById(id: string) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching movie:', error.message);
    throw new Error(error.message);
  }

  return data;
}

// Update a movie
export async function updateMovie(
  id: string,
  data: { poster: string; title: string; year: number }
) {
  const { error } = await supabase.from('movies').update(data).eq('id', id);

  if (error) {
    console.error('Error updating movie:', error.message);
    throw new Error(error.message);
  }
}

// Delete a movie
export async function deleteMovie(id: string) {
  const { error } = await supabase.from('movies').delete().eq('id', id);

  if (error) {
    console.error('Error deleting movie:', error.message);
    throw new Error(error.message);
  }
}
