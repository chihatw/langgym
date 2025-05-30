'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PROJECT_URL } from '../constants';

const localhost = '127.0.0.1';

const isDev = process.env.NODE_ENV === 'development';
const url = (isDev ? `http://${localhost}:3000` : PROJECT_URL) + '/welcome';

export async function signInWithMagicLink(email: string) {
  const supabase = await createClient();
  const result = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: url },
  });
  return result;
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return error.message;
  }
  return;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function updatePassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return error.message;
  return '';
}
