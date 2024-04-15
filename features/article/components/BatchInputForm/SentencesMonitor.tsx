import AudioSlider from '@/features/audioSlider/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { ArticleMark } from '../../schema';

type Props = {
  sentences: {
    japanese: string;
    original: string;
    pitchStr: string;
    chinese: string;
  }[];
  articleMarks: ArticleMark[];
  audioBuffer: AudioBuffer | null;
};

const SentencesMonitor = ({ sentences, articleMarks, audioBuffer }: Props) => {
  return (
    <div className='space-y-4'>
      {sentences.map((line, index) => (
        <div key={index} className='text-xs p-2 bg-white/60 rounded space-y-1'>
          <div className='font-extrabold'>{index + 1}</div>
          <div>{line.japanese}</div>
          <div className='text-gray-500'>{line.original}</div>
          <div className='text-[#52a2aa]'>{line.chinese}</div>
          <div>
            <SentencePitchLine pitchStr={line.pitchStr} />
          </div>
          {articleMarks.at(index) && audioBuffer ? (
            <AudioSlider
              start={articleMarks.at(index)!.start}
              end={articleMarks.at(index)!.end}
              audioBuffer={audioBuffer}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SentencesMonitor;
