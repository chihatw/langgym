'use client';

import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

type Props = { uid: string; pageState: string };

type FormProps = {
  pageState: string;
};

const INITIAL_STATE: FormProps = {
  pageState: 'blank',
};

const PageSwitch = ({ uid, pageState }: Props) => {
  const [value, setValue] = useState({ ...INITIAL_STATE, pageState });

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('page state')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'page_states' },
        (payload) => {
          const updated = payload.new;
          const { uid: _uid, pageState } = updated;
          if (uid === _uid) {
            setValue((prev) => ({ ...prev, pageState }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [uid]);

  switch (value.pageState) {
    case 'sokudokuRenshu':
      return <div>速読練習</div>;
    case 'sokudokuCue':
      return <div>速読キュー</div>;
    case 'paperCups':
      return <div>紙コップ</div>;
    case 'ga_wo_ni':
      return <div>がをに</div>;
    case 'record':
      return <div>録音</div>;
    case 'note':
      return <div>ノート</div>;
    case 'pitches':
      return <div>ピッチ</div>;
    case 'betterread':
      return <div>課前準備</div>;
    case 'blank':
      return <></>;
    default:
      return <div>{pageState}</div>;
  }
};

export default PageSwitch;
