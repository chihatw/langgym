import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import {
  PREPARE_POSTITS_VALUES,
  THREE_SENTENCES_VALUES,
} from '../../constants';
import { PostItWorkout } from '../../schema';

type Props = { workout: PostItWorkout };

const PostitWorksheetRoadmap = ({ workout }: Props) => {
  return (
    <Accordion type='single' defaultValue='value-1' collapsible>
      <AccordionItem value='value-1'>
        <AccordionTrigger>
          <div className='text-xl text-slate-700 font-extrabold'>練習流程</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='pl-[1em] grid gap-2'>
            <div className='flex gap-2 items-center text-lg font-bold'>
              <div>1. 寫三個日文短句</div>
              {workout.japanese_passed ? <div>✅</div> : null}
            </div>
            <div
              className={cn(
                'text-lg font-bold flex gap-2 items-center',
                (THREE_SENTENCES_VALUES.some(
                  (i) => !workout.checked.includes(i)
                ) ||
                  !workout.japanese) &&
                  'text-slate-400'
              )}
            >
              <div>2. 準備利貼</div>
              {PREPARE_POSTITS_VALUES.every((i) =>
                workout.checked.includes(i)
              ) ? (
                <div>✅</div>
              ) : null}
            </div>
            <div
              className={cn(
                'text-lg font-bold',
                PREPARE_POSTITS_VALUES.some(
                  (i) => !workout.checked.includes(i)
                ) && 'text-slate-400'
              )}
            >
              3. 助詞組合
            </div>
            <div
              className={cn(
                'text-lg font-bold',
                !workout.descriptions.length && 'text-slate-400'
              )}
            >
              4. 利貼造句（三個主題、三個句子）
            </div>
            <div
              className={cn(
                'text-lg font-bold',
                !workout.three_topics_passed && 'text-slate-400'
              )}
            >
              5. 句子排序
            </div>
            <div
              className={cn(
                'text-lg font-bold',
                !workout.ordered_passed && 'text-slate-400'
              )}
            >
              6. 利貼造句（一個主題、三個句子）
            </div>
            <div
              className={cn(
                'text-lg font-bold',
                !workout.one_topic_passed && 'text-slate-400'
              )}
            >
              7. 利貼造句（一個主題、一個句子）
            </div>
            <div
              className={cn(
                'text-lg font-bold text-slate-700 flex items-center gap-1',
                !workout.one_sentence_passed && 'text-slate-400'
              )}
            >
              8. 導入主題（
              <span>
                <Lock className='h-5 w-5' />
              </span>
              進階練習）
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetRoadmap;
