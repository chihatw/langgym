'use client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { BetterReadItem, BetterReadItemQuestion } from '../../schema';
import BetterreadFormRowImage from '../BetterreadForm/BetterreadFormRowImage';

type Props = {
  betterreadItems: BetterReadItem[];
  betterreadItemQuestions: BetterReadItemQuestion[];
};

type FormProps = {
  show: boolean;
};

const INITIAL_STATE: FormProps = {
  show: false,
};

const BetterreadView = ({
  betterreadItems,
  betterreadItemQuestions,
}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

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
          const { show } = updated;
          setValue((prev) => ({ ...prev, show }));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className='flex justify-center '>
      <div className='grid gap-8 pt-10 mt-6 max-w-lg'>
        {betterreadItems.map((betterreadItem, index) => (
          <div key={index} className='grid gap-4'>
            <BetterreadFormRowImage
              betterreadItem={betterreadItem}
              isView={true}
            />
            {value.show ? (
              <div>
                {betterreadItemQuestions
                  .filter((q) => q.betterread_item_id === betterreadItem.id)
                  .map((question, index) => (
                    <div key={index}>{question.question}</div>
                  ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterreadView;
