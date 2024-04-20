'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { ArticlePitchQuizAnswerRow } from '@/features/answer/schema';
import { insertQuizAnswers } from '@/features/answer/services/actions';
import { downloadAudioFile } from '@/features/article/services/client';
import { ACCENT_MARK, FULL_SPACE } from '@/features/pitchLine/constants';
import {
  buildNewPitchStr,
  getAccentIndex,
} from '@/features/pitchLine/services/utils';
import { blobToAudioBuffer } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { ArticlePitchQuestionView } from '../../schema';
import QuizFormSentence from './MngQuizFormSentence';

type Props = {
  questions: ArticlePitchQuestionView[];
};

type FormProps = {
  inputPitchStrs: string[];
  audioBuffer?: AudioBuffer;
};

const INITIAL_STATE: FormProps = {
  inputPitchStrs: [],
};

const QuizForm = ({ questions }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(INITIAL_STATE);

  // inputPitchStrs の作成
  useEffect(() => {
    const inputPitchStrs = buildInitialPitchStrs(questions);

    console.log({ questions, inputPitchStrs });
    setValue((prev) => ({ ...prev, inputPitchStrs }));
  }, [questions]);

  // audioBuffer の取得
  useEffect(() => {
    const question = questions.at(0);
    if (!question) return;
    const { audioPath, hasAudio } = question;
    if (!hasAudio || !audioPath) return;

    (async () => {
      const blob = await downloadAudioFile(audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;
      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [questions]);

  const handleClick = (line: number, wordIndex: number, index: number) => {
    const newPitchStrs = buildNewInputPitchStrs(
      value.inputPitchStrs,
      line,
      wordIndex,
      index
    );

    setValue((prev) => ({
      ...prev,
      inputPitchStrs: newPitchStrs,
    }));
  };

  const action = async () => {
    const rows: Omit<
      ArticlePitchQuizAnswerRow,
      'id' | 'created_at' | 'answerId'
    >[] = value.inputPitchStrs.map((pitchStr, line) => ({ pitchStr, line }));
    const question = questions.at(0);
    if (!question) return;
    const { quizId } = question;
    if (!quizId) return;
    startTransition(async () => {
      const { errMsg, answerId } = await insertQuizAnswers(quizId, rows);
      if (errMsg) {
        console.log(errMsg);
        return;
      }
      if (!answerId) return;
      router.push(`/mng/answer/${answerId}`);
    });
  };

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Quiz</div>
      <div className='grid gap-y-4'>
        {value.inputPitchStrs.map((pitchStr, line) => (
          <QuizFormSentence
            key={line}
            pitchStr={pitchStr}
            audioBuffer={value.audioBuffer}
            question={questions[line]}
            handleClick={(wordIndex: number, index: number) =>
              handleClick(line, wordIndex, index)
            }
          />
        ))}
        <SubmitServerActionButton isPending={isPending} action={action}>
          Submit
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default QuizForm;

function buildInitialPitchStrs(questions: ArticlePitchQuestionView[]) {
  return questions.map((question, line) =>
    question
      .pitchStr!.split(FULL_SPACE)
      .map((item, index) => {
        const isLocked = questions[line].lockedIndexes!.includes(index);
        if (isLocked) {
          return item;
        }
        return item.replace(ACCENT_MARK, '');
      })
      .join(FULL_SPACE)
  );
}

function buildNewInputPitchStrs(
  inputPitchStrs: string[],
  line: number,
  wordIndex: number,
  index: number
) {
  const clickedIndex = index + 1;
  const targetPitchStr = inputPitchStrs[line].split(FULL_SPACE)[wordIndex];
  const currentAccentIndex = getAccentIndex(targetPitchStr);
  const newAccentIndex = clickedIndex === currentAccentIndex ? 0 : clickedIndex;

  const newPitchStr = buildNewPitchStr(targetPitchStr, newAccentIndex);

  const newPitchStrs = [...inputPitchStrs];
  newPitchStrs[line] = newPitchStrs[line]
    .split(FULL_SPACE)
    .map((pitchStr, _wordIndex) =>
      _wordIndex === wordIndex ? newPitchStr : pitchStr
    )
    .join(FULL_SPACE);
  return newPitchStrs;
}
