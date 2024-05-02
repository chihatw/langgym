import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { Record, RecordParams } from '../schema';

export async function fetchRecordParams(): Promise<undefined | RecordParams> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('record_params')
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return {
    ...data,
    created_at: new Date(data.created_at),
  };
}

export async function fetchRecords(): Promise<Record[]> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.from('records').select();

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

export async function insertRecord(record: Omit<Record, 'id' | 'created_at'>) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase.from('records').insert(record);
  if (error) {
    console.error(error.message);
  }
}

export async function updateRecordParamsTitle(id: number, title: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('record_params')
    .update({ title })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function updateRecordParamsPitchStr(id: number, pitchStr: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('record_params')
    .update({ pitchStr })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function deleteRecord(id: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('records').delete().eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function deleteRecords(ids: number[]) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('records').delete().in('id', ids);

  if (error) {
    console.error(error.message);
  }
}
