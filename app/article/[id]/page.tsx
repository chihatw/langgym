import {
  fetchArticleById,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';
import { getYMDFromDateString } from '@/features/article/services/utils';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);
  if (!article) return <></>;
  const sentences = await fetchSentencesByArticleId(article.id);

  const { year, month, day } = getYMDFromDateString(article.date);

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <div className='text-2xl font-extrabold'>{article.title}</div>
        <div className='text-xs font-extralight'>{`${year}年${month}月${day}日`}</div>
      </div>
      <div className='space-y-4'>
        {sentences?.map((line, index) => (
          <div key={line.id} className='bg-white/60 rounded p-4 space-y-2'>
            <div className='text-xs font-extrabold'>{index + 1}</div>
            <div className='p-0 text-sm'>{line.japanese}</div>
            <div className='text-[11px] text-[#52a2aa]'>{line.chinese}</div>
            <div className='text-[11px] p-2 rounded bg-gray-200 text-gray-500'>
              {line.original}
            </div>
            {/* todo isShow 対応 */}
            <div className='p-2 rounded border-[0.5px] border-gray-500'>
              <SentencePitchLine pitchStr={line.pitchStr} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
