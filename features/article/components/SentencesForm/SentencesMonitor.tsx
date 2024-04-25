import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { SentenceView } from '../../schema';

type Props = {
  result: {
    japanese: string;
    original: string;
    pitchStr: string;
    chinese: string;
  }[];
  sentences: SentenceView[];
  audioBuffer: AudioBuffer | null;
};

const SentencesMonitor = ({ result, sentences, audioBuffer }: Props) => {
  return (
    <div className='space-y-4'>
      {result.map((line, index) => (
        <div key={index} className='text-xs p-2 bg-white/60 rounded space-y-1'>
          <div className='font-extrabold'>{index + 1}</div>
          <div>{line.japanese}</div>
          <div className='text-gray-500'>{line.original}</div>
          <div className='text-[#52a2aa]'>{line.chinese}</div>
          <div>
            <SentencePitchLine pitchStr={line.pitchStr} />
          </div>
          {sentences.at(index) && audioBuffer ? (
            <AudioSlider
              start={sentences.at(index)!.start!}
              end={sentences.at(index)!.end!}
              audioBuffer={audioBuffer}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SentencesMonitor;