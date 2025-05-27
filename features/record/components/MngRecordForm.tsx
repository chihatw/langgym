'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { deleteAudioFiles } from '@/features/storage/services/client';
import { createClient } from '@/utils/supabase/client';
import { ChangeEvent, useEffect, useState } from 'react';
import { Record, RecordParams } from '../schema';
import {
  deleteRecords,
  updateRecordParamsPitchStr,
  updateRecordParamsTitle,
} from '../services/client';
import MngRecordFormRow from './MngRecordFormRow';

type Props = {
  records: Record[];
  recordParams: RecordParams | undefined;
};

export type MngRecordFormProps = RecordParams & {
  records: Record[];
};

const INITIAL_STATE: MngRecordFormProps = {
  id: 0,
  title: '',
  pitchStr: '',
  created_at: new Date(),
  records: [],
};

const MngRecordForm = ({ recordParams, records }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    if (!recordParams) {
      setValue(INITIAL_STATE);
      return;
    }

    setValue((prev) => ({
      ...prev,
      ...recordParams,
    }));
  }, [recordParams]);

  // initialize
  useEffect(() => {
    setValue((prev) => ({ ...prev, records }));
  }, [records]);

  // subscribe
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('records mng record form')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'records' },
        (preload) => {
          const inserted = preload.new;
          const { id, title, pitchStr, path, created_at } = inserted;
          setValue((prev) => ({
            ...prev,
            records: [
              ...prev.records,
              {
                id,
                title,
                pitchStr,
                path,
                created_at: new Date(created_at),
              },
            ],
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue((prev) => ({ ...prev, title }));
    updateRecordParamsTitle(value.id, title);
  };

  const handleChangePitchStr = (e: ChangeEvent<HTMLInputElement>) => {
    const pitchStr = e.target.value;
    setValue((prev) => ({ ...prev, pitchStr }));
    updateRecordParamsPitchStr(value.id, pitchStr);
  };

  const handleDeleteAll = async () => {
    // storage
    await deleteAudioFiles(value.records.map((r) => r.path));

    // remote
    await deleteRecords(value.records.map((r) => r.id));

    // local
    setValue((prev) => ({ ...prev, records: [] }));
  };

  return (
    <MngPaneContainer label='Record'>
      <div className='grid gap-4'>
        <Input
          placeholder='title'
          value={value.title}
          onChange={handleChangeTitle}
        />

        <Input
          value={value.pitchStr}
          onChange={handleChangePitchStr}
          placeholder='pitchStr'
        />
        <Button onClick={handleDeleteAll}>Clear All Records</Button>
        {value.records.length ? (
          <div className='grid gap-2'>
            {value.records.map((record) => (
              <MngRecordFormRow
                key={record.id}
                record={record}
                handleRemoveRecord={() =>
                  setValue((prev) => ({
                    ...prev,
                    records: prev.records.filter(
                      (item) => item.id !== record.id
                    ),
                  }))
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </MngPaneContainer>
  );
};

export default MngRecordForm;
