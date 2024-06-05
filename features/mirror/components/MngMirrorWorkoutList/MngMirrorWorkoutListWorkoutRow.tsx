import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';
import { MirrorWorkoutResultItemView } from '../../schema';

type Props = {
  resultItems: MirrorWorkoutResultItemView[];
};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MngMirrorWorkoutListWorkoutRow = ({ resultItems }: Props) => {
  const display = resultItems.at(0)!.display;
  const resultIds = Array.from(new Set(resultItems.map((i) => i.resultId)));
  console.log(resultIds);
  const tempResultId = resultIds.at(0)!;
  const tempWorkoutItems = resultItems
    .filter((i) => i.resultId === tempResultId)
    .map(({ workoutItemIndex, number }) => ({ workoutItemIndex, number }));
  const workoutItemIndexes = Array.from(
    new Set(tempWorkoutItems.map((i) => i.workoutItemIndex!))
  ).sort((a, b) => a - b);

  const resultId_workoutItemIndex_laps: {
    resultId: number;
    workoutItemIndex: number;
    shuffledIndex: number;
    lap: number;
    isCorrect: boolean;
  }[] = [];
  for (const resultId of resultIds) {
    for (const workoutItemIndex of workoutItemIndexes) {
      const target = resultItems
        .filter((i) => i.resultId === resultId)
        .find((i) => i.workoutItemIndex === workoutItemIndex);
      resultId_workoutItemIndex_laps.push({
        resultId: resultId!,
        workoutItemIndex,
        lap: target?.lap!,
        isCorrect: target?.isCorrect!,
        shuffledIndex: target?.shuffledIndex!,
      });
    }
  }
  console.log(resultId_workoutItemIndex_laps);
  return (
    <div>
      <div>{display}</div>
      <div className='grid gap-1 pl-4'>
        <div className='grid grid-cols-[24px,78px,1fr] gap-2'>
          <div />
          <div className='text-xs'>numbers</div>
          <div className='flex gap-2'>
            {resultIds.map((resultId) => (
              <div className='text-xs basis-8 text-center' key={resultId}>
                {resultId}
              </div>
            ))}
            <div className='text-xs basis-8 text-center'>AVG.</div>
          </div>
        </div>
        {workoutItemIndexes.map((index) => {
          const numbers = tempWorkoutItems
            .filter((i) => i.workoutItemIndex === index)
            .map((i) => i.number!)
            .sort((a, b) => a - b);

          const avgItems: number[] = [];
          for (const resultId of resultIds) {
            const targetResult = resultId_workoutItemIndex_laps
              .filter((i) => i.workoutItemIndex === index)
              .find((i) => i.resultId === resultId)!;
            // 1問目と不正解は計算に含めない
            if (targetResult.shuffledIndex === 0 || !targetResult.isCorrect)
              continue;
            avgItems.push(targetResult.lap);
          }
          const avg = !!avgItems.length
            ? avgItems.reduce((acc, cur) => acc + cur, 0) / avgItems.length
            : 0;
          return (
            <div key={index} className='grid grid-cols-[24px,78px,1fr] gap-2'>
              <div className='text-xs'>{index + 1}</div>
              <div className='flex gap-2'>
                {numbers.map((number, index) => (
                  <div key={index} className={cn('text-xs', lato.className)}>
                    {number}
                  </div>
                ))}
              </div>
              <div className='flex gap-2'>
                {resultIds.map((resultId) => {
                  const targetResult = resultId_workoutItemIndex_laps
                    .filter((i) => i.workoutItemIndex === index)
                    .find((i) => i.resultId === resultId)!;
                  return (
                    <TooltipProvider>
                      <Tooltip key={resultId}>
                        <TooltipTrigger asChild>
                          <div className='basis-8 text-end'>
                            <div
                              className={cn(
                                'text-xs',
                                targetResult.shuffledIndex === 0 &&
                                  'text-slate-400',
                                targetResult.shuffledIndex !== 0 &&
                                  !targetResult.isCorrect &&
                                  'text-red-500'
                              )}
                            >
                              {(targetResult.lap / 1000).toFixed(2)}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='text-xs'>
                            {targetResult.shuffledIndex}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
                <div className='basis-9 text-end text-xs'>
                  {(avg / 1000).toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MngMirrorWorkoutListWorkoutRow;
