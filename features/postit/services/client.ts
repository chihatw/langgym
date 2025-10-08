import { createClient } from '@/utils/supabase/client';

export async function updatePostItWorkoutThreeTopicsImageUrls(
  id: number,
  three_topics_image_urls: string[]
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('postit_workouts')
    .update({ three_topics_image_urls })
    .eq('id', id);

  if (error) {
    console.log(error.message);
  }
}
