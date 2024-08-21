'use client';
import { fetchLatestArticleByUid } from '@/features/article/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import {
  BetterReadItem,
  BetterReadItemQuestion,
  BetterReadView,
} from '../../schema';
import {
  fetchBetterread,
  fetchBetterreadItemQuestions,
  fetchBetterreadItems,
} from '../../services/client';
import BetterreadFormRowImage from '../BetterreadForm/BetterreadFormRowImage';

type Props = {};

type FormProps = {
  betterread: BetterReadView | undefined;
  betterreadItems: BetterReadItem[];
  betterreadItemQuestions: BetterReadItemQuestion[];
  show: boolean;
};

const INITIAL_STATE: FormProps = {
  betterread: undefined,
  betterreadItems: [],
  betterreadItemQuestions: [],
  show: false,
};

const BetterreadView = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    (async () => {
      const supabase = createSupabaseClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setValue(INITIAL_STATE);
        return;
      }

      const article = await fetchLatestArticleByUid(user.id);
      if (!article) {
        setValue(INITIAL_STATE);
        return;
      }

      const betterread = await fetchBetterread(article.id);
      let betterreadItems: BetterReadItem[] = [];
      let betterreadItemQuestions: BetterReadItemQuestion[] = [];

      if (betterread && betterread.id) {
        betterreadItems = await fetchBetterreadItems(betterread.id);
      }

      if (betterreadItems.length) {
        betterreadItemQuestions = await fetchBetterreadItemQuestions(
          betterreadItems.map((i) => i.id)
        );
      }

      setValue((prev) => ({
        ...prev,
        betterread,
        betterreadItems,
        betterreadItemQuestions,
      }));
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
          const { show } = updated;
          console.log(show);
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
        {value.betterreadItems.map((betterreadItem, index) => (
          <div key={index} className='grid gap-4'>
            <BetterreadFormRowImage
              betterreadItem={betterreadItem}
              isView={true}
            />
            {value.show ? (
              <div>
                {value.betterreadItemQuestions
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
