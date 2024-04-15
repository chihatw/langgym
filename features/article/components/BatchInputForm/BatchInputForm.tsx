'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  markLongVowel,
  removeMarks,
} from '@/features/pitchLine/services/utils';
import { blobToAudioBuffer } from '@/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { Article, ArticleMark, Sentence } from '../../schema';
import { batchInsertSentences } from '../../services/actions';
import { downloadAudioFile } from '../../services/client';
import SentencesMonitor from './SentencesMonitor';

type Props = {
  article: Article;
  sentences?: Sentence[];
  articleMarks: ArticleMark[];
};

type FormProps = {
  japanese: string;
  original: string;
  _pitchStr: string;
  pitchStr: string;
  chinese: string;
  errMsg: string;
  disabled: boolean;
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  japanese: '',
  original: '',
  _pitchStr: '',
  pitchStr: '',
  chinese: '',
  errMsg: '',
  disabled: true,
  audioBuffer: null,
};

const ButchInputForm = ({ article, sentences, articleMarks }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(INITIAL_STATE);
  const [originalValue, setOriginalValue] = useState(INITIAL_STATE);
  const [isPending, startTransigion] = useTransition();

  const result = useMemo(() => buildResult(value), [value]);

  useEffect(() => {
    if (!sentences) return;
    const newValue = buildNewValue(sentences);
    setOriginalValue(newValue);

    if (!article.audioPath) {
      setValue(newValue);
    } else {
      (async () => {
        const blob = await downloadAudioFile(article.audioPath);
        if (!blob) return;

        const audioBuffer = await blobToAudioBuffer(blob);
        if (!audioBuffer) return;

        setValue({ ...newValue, audioBuffer });
      })();
    }
  }, [sentences, article]);

  const action = async () => {
    const sentences: Omit<Sentence, 'id' | 'created_at'>[] = result.map(
      (item, line) => ({
        ...item,
        line,
        articleId: article.id,
      })
    );
    startTransigion(async () => {
      const errMsg = await batchInsertSentences(article.id, sentences);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push('/');
    });
  };

  return (
    <div className='grid gap-y-4'>
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
      {result.length ? (
        <SentencesMonitor
          sentences={result}
          articleMarks={articleMarks}
          audioBuffer={value.audioBuffer}
        />
      ) : null}
      <form action={action}>
        <Button
          type='submit'
          disabled={
            value.disabled || isPending || isSameValue(value, originalValue)
          }
          className='flex items-center gap-x-0.5 w-full'
        >
          Submit
          {isPending ? <Loader2 className='animate-spin' /> : null}
        </Button>
      </form>
      {value.errMsg ? (
        <div className='text-xs text-red-500'>{value.errMsg}</div>
      ) : null}
    </div>
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

function buildNewValue(sentences: Sentence[]) {
  const _japanese: string[] = [];
  const _original: string[] = [];
  const _pitchStr: string[] = [];
  const _chinese: string[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const line = sentences[i];
    _japanese.push(line.japanese);
    _original.push(line.original);
    _pitchStr.push(line.pitchStr);
    _chinese.push(line.chinese);
  }

  const newValue: FormProps = {
    japanese: _japanese.join('\n'),
    original: _original.join('\n'),
    _pitchStr: _pitchStr.join('\n'),
    pitchStr: _pitchStr.join('\n'),
    chinese: _chinese.join('\n'),
    errMsg: '',
    disabled: false,
    audioBuffer: null,
  };
  return newValue;
}

function isSameValue(a: FormProps, b: FormProps) {
  return (
    a.japanese === b.japanese &&
    a.original === b.original &&
    a.pitchStr === b.pitchStr &&
    a._pitchStr === b._pitchStr &&
    a.chinese === b.chinese
  );
}
