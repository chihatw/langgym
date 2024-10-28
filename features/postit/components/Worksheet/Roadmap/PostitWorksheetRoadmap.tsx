import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Lock } from 'lucide-react';
import PostitWorksheetRoadmapItem from './PostitWorksheetRoadmapItem';

type Props = {
  threeSentencesCompleted: boolean;
  prepareCompleted: boolean;
  combineCompleted: boolean;
  threeTopicsCompleted: boolean;
  orderedCompleted: boolean;
  oneTopicCompleted: boolean;
  oneSentenceCompleted: boolean;
  introduceComplete: boolean;
};

const PostitWorksheetRoadmap = ({
  threeSentencesCompleted,
  prepareCompleted,
  combineCompleted,
  threeTopicsCompleted,
  orderedCompleted,
  oneTopicCompleted,
  oneSentenceCompleted,
  introduceComplete,
}: Props) => {
  return (
    <Accordion type='single' defaultValue='value-1' collapsible>
      <AccordionItem value='value-1'>
        <AccordionTrigger>
          <div className='text-xl text-slate-700 font-extrabold'>練習流程</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='pl-[1em] grid gap-2'>
            <PostitWorksheetRoadmapItem
              label='1. 寫三個日文短句'
              preItemCompleted={true}
              completed={threeSentencesCompleted}
            />
            <PostitWorksheetRoadmapItem
              label='2. 準備利貼'
              preItemCompleted={threeSentencesCompleted}
              completed={prepareCompleted}
            />
            <PostitWorksheetRoadmapItem
              label='3. 助詞組合'
              preItemCompleted={prepareCompleted}
              completed={combineCompleted}
            />
            <PostitWorksheetRoadmapItem
              label='4. 利貼造句（三個主題、三個句子）'
              preItemCompleted={prepareCompleted && combineCompleted}
              completed={threeTopicsCompleted}
            />
            <PostitWorksheetRoadmapItem
              label='5. 句子排序'
              preItemCompleted={threeTopicsCompleted}
              completed={orderedCompleted}
            />
            <PostitWorksheetRoadmapItem
              label='6. 利貼造句（一個主題、三個句子）'
              preItemCompleted={orderedCompleted}
              completed={oneTopicCompleted}
            />
            <PostitWorksheetRoadmapItem
              label='7. 利貼造句（一個主題、一個句子）'
              preItemCompleted={oneTopicCompleted}
              completed={oneSentenceCompleted}
            />
            <PostitWorksheetRoadmapItem
              label={
                <div className='flex gap-1 items-center'>
                  8. 導入主題（
                  <span>
                    <Lock className='h-5 w-5' />
                  </span>
                  進階練習）
                </div>
              }
              preItemCompleted={oneSentenceCompleted}
              completed={introduceComplete}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetRoadmap;
