'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function login(creadentials: { email: string; password: string }) {
  const supabase = await createClient();

  console.log('creadentials:', creadentials);

  const { error } = await supabase.auth.signInWithPassword(creadentials);

  console.log('ERROR:', error);

  if (error) {
    // redirect('/');
    return { error: error?.message };
  }

  console.log('Thhere is no error');

  const user = await supabase.auth.getUser();

  console.log('USER:', user);

  // revalidatePath('/', 'layout');
  redirect('/movies');
  // return {
  //   success: 'Loggedin Successfully',
  // };
}
