import { createClient } from '@/utils/supabase/server';
import { Record, RecordParams } from '../schema';

export async function fetchRecordParams(): Promise<undefined | RecordParams> {
  const supabase = await createClient();
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
  const supabase = await createClient();
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
