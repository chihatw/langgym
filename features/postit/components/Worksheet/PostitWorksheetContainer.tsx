import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { COMBINED_VALUES, PREPARE_POSTITS_VALUES } from '../../constants';
import { PostItWorkout } from '../../schema';
import PostitWorksheetCombinePostits from './Combine/PostitWorksheetCombinePostits';
import PostitWorksheetGoal from './Goal/PostitWorksheetGoal';
import PostitWorksheetPapers from './Papers/PostitWorksheetPapers';
import PostitWorksheetThreeSentences from './PostitWorksheetThreeSentences';
import PostitWorksheetPreparePostits from './Prepare/PostitWorksheetPreparePostits';
import PostitWorksheetRoadmap from './Roadmap/PostitWorksheetRoadmap';
import PostitWorksheetThreeTopics from './ThreeTopics/PostitWorksheetThreeTopics';

type Props = { workout: PostItWorkout };

const PostitWorksheetContainer = ({ workout }: Props) => {
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>利貼學習單</div>
      <div className='grid gap-0'>
        <PostitWorksheetGoal />
        <PostitWorksheetPapers />
        <PostitWorksheetRoadmap
          threeSentencesCompleted={workout.japanese_passed}
          prepareCompleted={PREPARE_POSTITS_VALUES.every((i) =>
            workout.checked.includes(i)
          )}
          combineCompleted={COMBINED_VALUES.every((i) =>
            workout.checked.includes(i)
          )}
          threeTopicsCompleted={workout.three_topics_passed}
          orderedCompleted={false}
          oneTopicCompleted={false}
          oneSentenceCompleted={false}
          introduceComplete={false}
        />
        <PostitWorksheetThreeSentences
          workout={workout}
          preItemCompleted={true}
          completed={workout.japanese_passed}
        />
        <PostitWorksheetPreparePostits
          workout={workout}
          preItemCompleted={workout.japanese_passed}
          completed={PREPARE_POSTITS_VALUES.every((i) =>
            workout.checked.includes(i)
          )}
        />
        <PostitWorksheetCombinePostits
          workout={workout}
          preItemCompleted={PREPARE_POSTITS_VALUES.every((i) =>
            workout.checked.includes(i)
          )}
          completed={COMBINED_VALUES.every((i) => workout.checked.includes(i))}
        />
        <PostitWorksheetThreeTopics
          workout={workout}
          preItemCompleted={[
            ...COMBINED_VALUES,
            ...PREPARE_POSTITS_VALUES,
          ].every((i) => workout.checked.includes(i))}
          completed={workout.three_topics_passed}
        />
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>5. 句子排序</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>6. 利貼造句（一個主題、三個句子）</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>7. 利貼造句（一個主題、一個句子）</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>8. 導入主題</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PostitWorksheetContainer;
