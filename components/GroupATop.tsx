import BetterreadContainer from '@/features/betterread/components/BetterreadContainer';

import MirrorNumbersLoader from '@/features/mirror/components/MirrorWorkoutTopPane/MirrorWorkoutLoader';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import PostItLoader from '@/features/postit/components/PostItLoader';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import WorkoutListContainer from '@/features/workout/components/WorkoutList/WorkoutListContainer';
import Image from 'next/image';
import ArticleListLoader from '../features/article/components/ArticleList/ArticleListLoader';
import BorderLabel from './BorderLabel';
import HiddenElements from './HiddenElements';

type Props = { uid: string; cheat?: boolean };

const items = [
  { label: '1號', filename: 'sheet1' },
  { label: '2號', filename: 'sheet2' },
  { label: '3號', filename: 'sheet3' },
  { label: '4號', filename: 'sheet4' },
  { label: '5號', filename: 'sheet5' },
  { label: '6號', filename: 'sheet6' },
];

const GroupATop = async ({ uid, cheat }: Props) => {
  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(uid);

  return (
    <>
      <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
        <div className='grid gap-4'>
          <BorderLabel label='連絡事項' />
          <div className='grid gap-2 pl-2'>
            <div>
              <div>・寫「語法筆記」</div>
              <div className='pl-4 text-sm text-gray-500 grid'>
                <div>這週學到兩個項目，號碼是4跟5</div>
                <div>各個項目需要日文例句。（先不用利貼造句）</div>
                <div>兩個項目寫好，先由LINE傳給我。</div>
              </div>
            </div>
            <div>
              <div>・利貼造句（限定李桑）</div>
              <div className='pl-4 text-sm text-gray-500 grid'>
                <div>「後ろにいる人は店員ですか。」</div>
              </div>
            </div>
            <div>
              <div>・「作業台」一號到六號拍給我看</div>
              <div className='pl-4 text-sm text-gray-500 grid'></div>
              <div className='pl-4 grid gap-2'>
                {items.map((item, index) => (
                  <div className='grid gap-2' key={index}>
                    <div className='text-sm text-gray-500'>{item.label}</div>
                    <div className='flex-1 rounded-lg overflow-hidden'>
                      <Image
                        src={`/images/${item.filename}.jpg`}
                        alt='sheet1'
                        width={512}
                        height={512}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ArticleListLoader uid={uid} />
        <QuizListContainer uid={uid} />
        <WorkoutListContainer uid={uid} />
        <BetterreadContainer uid={uid} />
        <PostItLoader uid={uid} />
        <MirrorNumbersLoader uid={uid} />
      </div>
      <HiddenElements
        uid={uid}
        cheat={cheat}
        latestMirrorResult={latestMirrorResult}
      />
    </>
  );
};

export default GroupATop;
