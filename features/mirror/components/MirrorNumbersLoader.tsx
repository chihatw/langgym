import BorderLabel from '@/components/BorderLabel';
import Link from 'next/link';
import { MIRROR_WORKOUTS_LABEL } from '../constants';
import {
  fetchMirrorWorkoutResultItemViewsByWorkoutIds,
  fetchMirrorWorkoutsByUid,
} from '../services/server';

type Props = { uid: string };

const RESULT_LABELS = ['第一名', '第二名', '第三名'];

const MirrorNumbersLoader = async ({ uid }: Props) => {
  const mirrorWorkouts = await fetchMirrorWorkoutsByUid(uid);

  if (!mirrorWorkouts.length) return null;

  const resultItems = await fetchMirrorWorkoutResultItemViewsByWorkoutIds(
    mirrorWorkouts.map((w) => w.id)
  );

  // unique な resultIds を抽出
  const resultIds = Array.from(new Set(resultItems.map((i) => i.resultId)));

  const best_3 = resultIds
    .filter((resultId) => {
      const targetResultItems = resultItems.filter(
        (i) => i.resultId === resultId
      );
      // その resultId をもつ items がすべて正解のものだけを抽出
      return targetResultItems.every((i) => i.isCorrect);
    })
    .map((resultId) => {
      const resultItem = resultItems.find((i) => i.resultId === resultId)!;
      // resultId と totalTime でオブジェクトを作成
      return { resultId, totalTime: resultItem.totalTime! };
    })
    // totalTime の上位3つを抽出
    .sort((a, b) => a.totalTime - b.totalTime)
    .slice(0, 3);

  return (
    <div className='grid gap-4'>
      <BorderLabel label={MIRROR_WORKOUTS_LABEL} />
      <div className='grid gap-4'>
        {mirrorWorkouts.map((workout, index) => (
          <div key={index} className='bg-white/60 p-5 rounded-lg block'>
            <Link href={`/mirror/${workout.id}`}>
              <div className='grid gap-4 '>{`練習`}</div>
            </Link>
            <div className='grid gap-2'>
              <div className='flex justify-end'>
                <div className='text-xs text-slate-500 w-[100px]'>{`滿分記錄 ${best_3.length}/3`}</div>
              </div>
              {best_3.map((result, index) => (
                <Link
                  href={`/mirror/${workout.id}/${result.resultId}`}
                  key={index}
                  className='text-end text-xs text-slate-500'
                >
                  <div className='flex justify-end'>
                    <div className='grid grid-cols-[60px,60px]'>
                      <div>{RESULT_LABELS[index]}</div>
                      <div>{`${(result.totalTime! / 1000).toFixed(2)} 秒`}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MirrorNumbersLoader;
