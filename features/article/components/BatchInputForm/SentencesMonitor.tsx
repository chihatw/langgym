import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';

type Props = {
  sentences: {
    japanese: string;
    original: string;
    pitchStr: string;
    chinese: string;
  }[];
};

const SentencesMonitor = ({ sentences }: Props) => {
  return (
    <div className='space-y-4'>
      {sentences.map((line, index) => (
        <div key={index} className='text-xs p-2 bg-white/60 rounded'>
          <div className='font-extrabold'>{index + 1}</div>
          <div>{line.japanese}</div>
          <div className='text-gray-500'>{line.original}</div>
          <div>
            <SentencePitchLine pitchStr={line.pitchStr} />
          </div>
          <div className='text-[#52a2aa]'>{line.chinese}</div>
        </div>
      ))}
    </div>
  );
};

export default SentencesMonitor;
