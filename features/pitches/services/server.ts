import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Pitches, PitchesUser } from '../schema';

export async function fetchPitches(): Promise<Pitches | undefined> {
  const supabase = createSupabaseServerComponentClient();

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
  const supabase = createSupabaseServerComponentClient();

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
