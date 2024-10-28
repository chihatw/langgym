'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Textarea } from '@/components/ui/textarea';
import { PostItWorkout } from '@/features/postit/schema';
import { updatePostItWorkoutJapanese } from '@/features/postit/services/actions';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';

type Props = { workout: PostItWorkout; values: number[]; disabled: boolean };

type FormProps = { input: string; errMsg: string };

const INITIAL_STATE: FormProps = { input: '', errMsg: '' };

const PostitThreeSentencesTextarea = ({ workout, values, disabled }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    setValue((prev) => ({ ...prev, input: workout.japanese }));
  }, [workout]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prev) => ({
      ...prev,
      input: e.target.value,
      errMsg: '',
    }));
  };

  const action = async () => {
    startTransition(async () => {
      const errMsg = await updatePostItWorkoutJapanese(workout.id, value.input);

      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
    });
  };

  return (
    <div className='grid gap-2'>
      <div className='text-xl'>
        <span>以「</span>
        <b>{workout.topic}</b>
        <span>」為主題</span>
      </div>
      <div className='grid gap-2'>
        <div className='text-xs text-slate-600'></div>
        <Textarea
          value={value.input}
          rows={5}
          disabled={
            !values.every((i) => workout.checked.includes(i)) || disabled
          }
          placeholder={
            values.some((i) => !workout.checked.includes(i))
              ? `還有${
                  values.filter((i) => !workout.checked.includes(i)).length
                }個項目要打勾`
              : '請寫出關於「同一主題」的三個日文短句'
          }
          onChange={handleChange}
        />
        <SubmitServerActionButton
          action={action}
          disabled={isPending || workout.japanese === value.input}
          errMsg={value.errMsg}
          isPending={isPending}
        >
          {!workout.japanese ? '送出' : '更新'}
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default PostitThreeSentencesTextarea;
