import { createClient } from '@/utils/supabase/server';
import { Pitches, PitchesUser } from '../schema';

export async function fetchPitches(): Promise<Pitches | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('pitches')
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }
  return data;
}

export async function fetchPitchesUser(): Promise<PitchesUser | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('pitches_user')
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }
  return data;
}
