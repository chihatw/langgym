'use client';
import { Textarea } from '@/components/ui/textarea';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import {
  markLongVowel,
  removeMarks,
} from '@/features/pitchLine/services/utils';
import { blobToAudioBuffer } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import BuildArticlePitchQuizButton from '../../../quiz/components/BuildArticlePitchQuizButton';
import { Sentence, SentenceView } from '../../schema';
import { batchInsertSentences } from '../../services/actions';
import { downloadAudioFile } from '../../services/client';
import SentencesMonitor from './SentencesMonitor';

type Props = {
  sentences: SentenceView[];
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

const ButchInputForm = ({ sentences }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(INITIAL_STATE);
  const [originalValue, setOriginalValue] = useState(INITIAL_STATE);
  const [isPending, startTransigion] = useTransition();

  const result = useMemo(() => buildResult(value), [value]);
  const sentence = useMemo(() => sentences.at(0), [sentences]);

  useEffect(() => {
    if (!sentence) return;

    const newValue = buildNewValue(sentences);
    setOriginalValue(newValue);

    const { audioPath } = sentence;

    if (!audioPath) {
      setValue(newValue);
    } else {
      (async () => {
        const blob = await downloadAudioFile(audioPath);
        if (!blob) return;

        const audioBuffer = await blobToAudioBuffer(blob);
        if (!audioBuffer) return;

        setValue({ ...newValue, audioBuffer });
      })();
    }
  }, [sentences, sentence]);

  const action = async () => {
    if (!sentence) return;

    const { articleId } = sentence;
    if (!articleId) return;

    const _sentences: Omit<Sentence, 'id' | 'created_at'>[] = result.map(
      (item, line) => ({
        ...item,
        line,
        articleId,
      })
    );
    startTransigion(async () => {
      const errMsg = await batchInsertSentences(articleId, _sentences);
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
          result={result}
          audioBuffer={value.audioBuffer}
          sentences={sentences}
        />
      ) : null}
      <SubmitServerActionButton
        action={action}
        isPending={isPending}
        disabled={value.disabled || isSameValue(value, originalValue)}
        errMsg={value.errMsg}
      >
        Submit
      </SubmitServerActionButton>

      {!!sentences.length ? (
        <BuildArticlePitchQuizButton sentences={sentences} />
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

function buildNewValue(sentences: SentenceView[]) {
  const _japanese: string[] = [];
  const _original: string[] = [];
  const _pitchStr: string[] = [];
  const _chinese: string[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const line = sentences[i];
    _japanese.push(line.japanese!);
    _original.push(line.original!);
    _pitchStr.push(line.pitchStr!);
    _chinese.push(line.chinese!);
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
