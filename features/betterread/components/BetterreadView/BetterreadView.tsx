'use client';
import { Sentence } from '@/features/article/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { BetterReadItem, BetterReadItemQuestion } from '../../schema';
import BetterreadFormRowImage from '../BetterreadForm/BetterreadFormRowImage';
import BetterreadFormSentence from '../BetterreadForm/BetterreadFormSentence';

type Props = {};

type FormProps = {
  show: boolean;
  sentences: Sentence[];
  betterreadId: number | null;
  betterreadItems: BetterReadItem[];
  betterreadItemQuestions: BetterReadItemQuestion[];
};

const INITIAL_STATE: FormProps = {
  show: false,
  sentences: [],
  betterreadId: null,
  betterreadItems: [],
  betterreadItemQuestions: [],
};

const BetterreadView = ({}: Props) => {
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

      const { betterread_id, show } = data;

      if (!betterread_id) return;
      setValue((prev) => ({ ...prev, betterreadId: betterread_id, show }));
    })();
  }, []);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel(`betterread_toggle ${nanoid()}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'betterread_toggle' },
        (preload) => {
          const updated = preload.new;
          const { show, betterread_id } = updated;
          setValue((prev) => ({
            ...prev,
            show,
            betterreadId: betterread_id,
          }));
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
        .from('betterread_items')
        .select()
        .eq('betterread_id', value.betterreadId)
        .order('created_at');
      if (error_i) {
        console.error(error_i.message);
        return;
      }

      const betterreadItemIds = data_i.map((item) => item.id);

      let betterreadItemQuestions: BetterReadItemQuestion[] = [];

      if (betterreadItemIds) {
        const { data, error } = await supabase
          .from('betterread_item_questions')
          .select()
          .eq('betterread_item_id', betterreadItemIds);

        if (error) {
          console.error(error.message);
          return;
        }
        betterreadItemQuestions = data.map((item) => ({
          ...item,
          created_at: new Date(item.created_at),
        }));
      }

      setValue((prev) => ({
        ...prev,
        sentences: data_s.map((item) => ({
          ...item,
          created_at: new Date(item.created_at),
        })),
        betterreadItems: data_i.map((item) => ({
          ...item,
          created_at: new Date(item.created_at),
        })),
        betterreadItemQuestions,
      }));
    })();
  }, [value.betterreadId]);

  return (
    <div className='flex justify-center '>
      <div className='grid gap-1'>
        {value.sentences.map((sentence, index) => (
          <BetterreadFormSentence
            key={index}
            japanese={sentence.japanese || ''}
            chinese={sentence.chinese || ''}
          />
        ))}
      </div>
      <div className='grid gap-8 pt-10 mt-6 max-w-lg'>
        {value.betterreadItems.map((betterreadItem, index) => (
          <div key={index} className='grid gap-4'>
            <BetterreadFormRowImage
              betterreadItem={betterreadItem}
              isView={true}
            />
            <div className='grid gap-4'>
              {value.betterreadItemQuestions
                .filter((q) => q.betterread_item_id === betterreadItem.id)
                .map((question, index) => (
                  <div key={index} className='grid gap-0'>
                    <div className='grid grid-cols-[auto,1fr] gap-2 items-center'>
                      <div className='text-2xl'>👀</div>
                      {question.view_point}
                    </div>
                    {value.show ? (
                      <div className='grid grid-cols-[auto,1fr] gap-2 items-center'>
                        <div className='text-2xl'>❓</div>
                        {question.question}
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterreadView;
