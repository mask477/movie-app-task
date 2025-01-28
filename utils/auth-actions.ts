'use server';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await (await supabase).auth.signInWithPassword(data);

  if (error) {
    // return { error: error.message };
    // throw new Error(error?.message);

    return { error: error?.message };
    // redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  console.log('SIGNUP DATA:', data);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  return {
    success: 1,
  };
}

export async function signout() {
  console.log('=== signout()');

  const supabase = createClient();

  const { error } = await (await supabase).auth.signOut();
  if (error) {
    console.error(error);
    redirect('/error');
  }

  redirect('/logout');
}
