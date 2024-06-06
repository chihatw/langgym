import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { REMOTE_TRIGGER_ID } from '../constants';

export async function updateRemoteLoginTrigger() {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('remote_trigger')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', REMOTE_TRIGGER_ID.login);
  if (error) {
    console.error(error);
    return;
  }
  return;
}

export async function updateRedirectToRealtimeTrigger() {
  const supabase = createSupabaseClientComponentClient();

  // redirect を発火する前に pageState を blank にする
  // 全ての uid を取得
  const { data } = await supabase.from('users').select();
  if (!data) return;

  // 取得した uid に対して更新
  const uids = data.map((user) => user.uid);
  const { error: error_users } = await supabase
    .from('users')
    .update({ realtimePage: 'blank' })
    .in('uid', uids);
  if (error_users) console.error(error_users.message);

  //
  const { error } = await supabase
    .from('remote_trigger')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', REMOTE_TRIGGER_ID.redirect_to_realtime);

  if (error) console.error(error.message);
}

export async function updateRedirectToRealtimeCanvasTrigger() {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('remote_trigger')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', REMOTE_TRIGGER_ID.redirect_to_realtime_canvas);

  if (error) console.error(error.message);
}

export async function updateBackToHomeTrigger() {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('remote_trigger')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', REMOTE_TRIGGER_ID.back_to_home);

  if (error) console.error(error.message);
}

export async function updateRefreshRealtimeTrigger() {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('remote_trigger')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', REMOTE_TRIGGER_ID.refresh_realtime);

  if (error) console.error(error.message);
}
