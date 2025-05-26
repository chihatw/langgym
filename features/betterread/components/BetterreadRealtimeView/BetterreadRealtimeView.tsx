'use client';
import { Sentence } from '@/features/article/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { BetterReadItemView } from '../../schema';
import BetterreadFormRowImage from '../BetterreadForm/BetterreadFormRowImage';
import BetterreadFormSentence from '../BetterreadForm/BetterreadFormSentence';

type Props = {};

type FormProps = {
  viewPoints: number[];
  questions: number[];
  sentences: Sentence[];
  betterreadId: number | null;
  betterreadItems: BetterReadItemView[];
  uniqBetterreadItemIds: number[];
};

const INITIAL_STATE: FormProps = {
  viewPoints: [],
  questions: [],
  sentences: [],
  betterreadId: null,
  betterreadItems: [],
  uniqBetterreadItemIds: [],
};

const BetterreadRealtimeView = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    (async () => {
      const { data, error } = await supabase
        .from('betterread_toggle')
        .select()
        .limit(1)
        .single();

      if (error) {
        console.error(error.message);
        return;
      }

      const { betterread_id, questions, view_points } = data;

      if (!betterread_id) return;

      setValue((prev) => {
        const value: FormProps = {
          ...prev,
          questions,
          viewPoints: view_points,
          betterreadId: betterread_id,
        };
        return value;
      });
    })();
  }, []);

  // subscribe betterread_toggle
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel(`betterread_toggle ${nanoid()}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'betterread_toggle' },
        (preload) => {
          const updated = preload.new;
          const { betterread_id, view_points, questions } = updated;
          setValue((prev) => {
            const value: FormProps = {
              ...prev,
              questions,
              viewPoints: view_points,
              betterreadId: betterread_id,
            };
            return value;
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // subscribe betterread_items
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel(`betterread_item_questions ${nanoid()}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'betterread_item_questions',
        },
        (preload) => {
          const inserted = preload.new;
          const { id, view_point, question, betterread_item_id, created_at } =
            inserted;

          setValue((prev) => {
            let { betterreadItems } = prev;

            const targetItem = prev.betterreadItems.find(
              (item) => item.id === betterread_item_id
            )!;

            const betterreadItem: BetterReadItemView = {
              ...targetItem,
              question_id: id,
              question,
              view_point,
              question_created_at: new Date(created_at),
            };

            betterreadItems = [...betterreadItems, betterreadItem];

            const value: FormProps = { ...prev, betterreadItems };
            return value;
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'betterread_item_questions',
        },
        (preload) => {
          const updated = preload.new;
          const { id, view_point, question } = updated;

          setValue((prev) => {
            let { betterreadItems } = prev;

            betterreadItems = betterreadItems.map((item) => {
              if (item.question_id === id) {
                return { ...item, view_point, question };
              }
              return item;
            });
            const value: FormProps = { ...prev, betterreadItems };
            return value;
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'betterread_item_questions',
        },
        (preload) => {
          const { id } = preload.old;
          setValue((prev) => {
            let { betterreadItems } = prev;
            betterreadItems = betterreadItems.filter(
              (item) => item.question_id !== id
            );

            const value: FormProps = { ...prev, betterreadItems };

            return value;
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // betterread_id side effect
  useEffect(() => {
    if (!value.betterreadId) return;

    (async () => {
      if (!value.betterreadId) return;
      const supabase = createSupabaseClientComponentClient();

      const { data: data_b, error: error_b } = await supabase
        .from('betterread')
        .select()
        .eq('id', value.betterreadId)
        .limit(1)
        .single();

      if (error_b) {
        console.error(error_b.message);
        return;
      }

      const { articleId } = data_b;

      const { data: data_s, error: error_s } = await supabase
        .from('sentences')
        .select()
        .eq('articleId', articleId)
        .order('line');

      if (error_s) {
        console.error(error_s.message);
        return;
      }

      const { data: data_i, error: error_i } = await supabase
        .from('betterread_items_view')
        .select()
        .eq('betterread_id', value.betterreadId)
        .order('item_created_at')
        .order('question_created_at');
      if (error_i) {
        console.error(error_i.message);
        return;
      }

      setValue((prev) => {
        const value: FormProps = {
          ...prev,
          sentences: data_s.map((item) => ({
            ...item,
            created_at: new Date(item.created_at),
          })),
          uniqBetterreadItemIds: Array.from(
            new Set(data_i.map((item) => item.id!))
          ),
          betterreadItems: data_i.map((item) => ({
            ...item,
            item_created_at: new Date(item.item_created_at!),
            question_created_at: new Date(item.question_created_at!),
          })),
        };
        return value;
      });
    })();
  }, [value.betterreadId]);

  return (
    <div className='mx-auto max-w-md grid pt-10 pb-40'>
      <div className='grid gap-1'>
        {value.sentences.map((sentence, index) => (
          <BetterreadFormSentence
            key={index}
            japanese={sentence.japanese || ''}
            chinese={sentence.chinese || ''}
          />
        ))}
      </div>
      <div className='flex justify-center '>
        <div className='grid gap-8 pt-10 mt-6 max-w-lg'>
          {value.uniqBetterreadItemIds.map((betterreadItemId) => {
            const betterreadItem = value.betterreadItems.find(
              (item) => item.id === betterreadItemId
            );
            if (!betterreadItem) return null;
            const betterreadItems = value.betterreadItems.filter(
              (item) => item.id === betterreadItemId
            );
            return (
              <div key={betterreadItemId} className='grid gap-4'>
                <BetterreadFormRowImage
                  betterreadItem={betterreadItem}
                  isView={true}
                />
                <div className='grid gap-4'>
                  {betterreadItems.map((item) => {
                    return (
                      <div key={item.question_id!} className='grid gap-0'>
                        {value.viewPoints.includes(item.question_id!) ? (
                          <div className='grid grid-cols-[auto_1fr] gap-2 items-center'>
                            <div className='text-2xl'>👀</div>
                            {item.view_point}
                          </div>
                        ) : null}

                        {value.questions.includes(item.question_id!) ? (
                          <div className='grid grid-cols-[auto_1fr] gap-2 items-center'>
                            <div className='text-2xl'>❓</div>
                            {item.question}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BetterreadRealtimeView;
