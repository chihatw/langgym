import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { Pitches, PitchesUser } from '../schema';

export async function fetchPitches(): Promise<Pitches | undefined> {
  const supabase = createSupabaseClientComponentClient();

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
  const supabase = createSupabaseClientComponentClient();

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

export async function updatePitchesJapanese(id: number, japanese: string) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('pitches')
    .update({ japanese })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function updatePitchesPitchStr(id: number, pitchStr: string) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('pitches')
    .update({ pitchStr })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function updatePitchesUserPitchStr(id: number, pitchStr: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('pitches_user')
    .update({ pitchStr })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}
