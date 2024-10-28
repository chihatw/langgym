import { THREE_SENTENCES_VALUES } from '../../constants';
import { PostItWorkout } from '../../schema';

import PostitWorksheetAccordionWrapper from './PostitWorksheetAccordionWrapper';
import PostitWorksheetMultipleCheckButton from './PostitWorksheetMultipleCheckButton';
import PostitThreeSentencesTextarea from './ThreeSentences/PostitThreeSentencesTextarea';
import PostitThreeSentencesTopic_0 from './ThreeSentences/PostitThreeSentencesTopic_0';
import PostitThreeSentencesTopic_1 from './ThreeSentences/PostitThreeSentencesTopic_1';
import PostitThreeSentencesTopic_2 from './ThreeSentences/PostitThreeSentencesTopic_2';
import PostitThreeSentencesTopic_3 from './ThreeSentences/PostitThreeSentencesTopic_3';

type Props = {
  workout: PostItWorkout;
  preItemCompleted: boolean;
  completed: boolean;
};

const PostitWorksheetThreeSentences = ({
  workout,
  completed,
  preItemCompleted,
}: Props) => {
  return (
    <PostitWorksheetAccordionWrapper
      label='1. 寫三個日文短句'
      preItemCompleted={preItemCompleted}
      completed={completed}
    >
      <div className='pl-[1em] grid gap-12'>
        <div className='grid gap-2'>
          <div className=''>確認後，請打勾</div>
          <PostitThreeSentencesTopic_0 workout={workout} disabled={completed} />
          <PostitThreeSentencesTopic_1 workout={workout} disabled={completed} />
          <PostitThreeSentencesTopic_2 workout={workout} disabled={completed} />
          <PostitThreeSentencesTopic_3 workout={workout} disabled={completed} />
          <PostitWorksheetMultipleCheckButton
            workout={workout}
            values={THREE_SENTENCES_VALUES}
            disabled={completed}
          />
        </div>

        <PostitThreeSentencesTextarea
          workout={workout}
          values={THREE_SENTENCES_VALUES}
          disabled={completed}
        />
      </div>
    </PostitWorksheetAccordionWrapper>
  );
};

export default PostitWorksheetThreeSentences;
