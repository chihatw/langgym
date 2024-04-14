'use client';
import { useEffect, useState } from 'react';
import { Article, ArticleMark, Sentence } from '../../schema';
import { getYMDFromDateString } from '../../services/utils';
import SentenceRow from './SentenceRow';

type Props = {
  article: Article;
  sentences: Sentence[];
  articleMarks: ArticleMark[];
};

const ArticlePane = ({ article, sentences, articleMarks }: Props) => {
  const { year, month, day } = getYMDFromDateString(article.date);
  const [audioBuffer, setAudioBuffer] = useState(null);

  useEffect(() => {
    //
  }, []);
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <div className='text-2xl font-extrabold'>{article.title}</div>
        <div className='text-xs font-extralight'>{`${year}年${month}月${day}日`}</div>
      </div>
      <div className='space-y-4'>
        {sentences?.map((sentence, index) => (
          <SentenceRow
            key={index}
            sentence={sentence}
            index={index}
            isShowAccents={article.isShowAccents}
            articleMark={articleMarks.at(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlePane;
