'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  markLongVowel,
  removeMarks,
} from '@/features/pitchLine/services/utils';
import { useMemo, useState } from 'react';
import { Article } from '../schema';
import SentencesMonitor from './SentencesMonitor';

type Props = { article: Article };

type FormProps = {
  japanese: string;
  original: string;
  _pitchStr: string;
  pitchStr: string;
  chinese: string;
  errMsg: string;
  disabled: boolean;
};

const INITIAL_STATE: FormProps = {
  japanese: '',
  original: '',
  _pitchStr: '',
  pitchStr: '',
  chinese: '',
  errMsg: '',
  disabled: true,
};

const ButchInputForm = ({ article }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const result = useMemo(() => buildResult(value), [value]);

  const action = async () => {
    // todo
  };

  return (
    <form className='grid gap-y-4' action={action}>
      <Textarea
        placeholder='Japanese'
        value={value.japanese}
        onChange={(e) => {
          setValue((prev) => ({
            ...prev,
            japanese: e.target.value,
            errMsg: '',
            disabled: !e.target.value || !prev.original || !prev.pitchStr,
          }));
        }}
      />
      <Textarea
        placeholder='Original'
        value={value.original}
        onChange={(e) => {
          setValue((prev) => ({
            ...prev,
            original: e.target.value,
            errMsg: '',
            disabled: !prev.japanese || !e.target.value || !prev.pitchStr,
          }));
        }}
      />
      <Textarea
        placeholder='_PitchStr'
        value={value._pitchStr}
        onChange={(e) => {
          const pitchStr = markLongVowel(removeMarks(e.target.value));
          setValue((prev) => ({
            ...prev,
            _pitchStr: e.target.value,
            pitchStr,
            errMsg: '',
            disabled: !prev.japanese || !prev.original || !pitchStr,
          }));
        }}
      />
      <Textarea
        placeholder='PitchStr'
        value={value.pitchStr}
        onChange={(e) => {
          setValue((prev) => ({
            ...prev,
            pitchStr: e.target.value,
            errMsg: '',
            disabled: !prev.japanese || !prev.original || !e.target.value,
          }));
        }}
      />
      <Textarea
        placeholder='Chinese'
        value={value.chinese}
        onChange={(e) => {
          setValue((prev) => ({
            ...prev,
            chinese: e.target.value,
            errMsg: '',
          }));
        }}
      />
      {result.length ? <SentencesMonitor sentences={result} /> : null}
      <Button type='submit' disabled={value.disabled}>
        Submit
      </Button>
    </form>
  );
};

export default ButchInputForm;

function buildResult(value: FormProps) {
  const result: {
    japanese: string;
    original: string;
    pitchStr: string;
    chinese: string;
  }[] = value.japanese.split('\n').map((_, i) => {
    return {
      japanese: value.japanese.split('\n').at(i) || '',
      original: value.original.split('\n').at(i) || '',
      pitchStr: value.pitchStr.split('\n').at(i) || '',
      chinese: value.chinese.split('\n').at(i) || '',
    };
  });
  return result;
}
