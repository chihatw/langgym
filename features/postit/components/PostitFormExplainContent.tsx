import Image from 'next/image';

type Props = {};

const PostitFormExplainContent = ({}: Props) => {
  return (
    <div className='grid gap-8'>
      <div className='grid gap-2 text-slate-700 '>
        <div className='font-extrabold text-xl'>使用利貼造句</div>
        <div>請仔細看紙顏色、符號、線顏色等等。</div>
      </div>
      <div className='grid gap-2'>
        <div className='flex items-center'>
          <div className='text-xs'>例）</div>
          <div className='font-bold text-sm'>映画を見て、家に帰りました。</div>
        </div>
        <div className='flex gap-4'>
          <div className='basis-2' />
          <div className='flex-1 rounded-lg overflow-hidden'>
            <Image
              src='/images/postit.jpg'
              alt='postit'
              width={512}
              height={512}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostitFormExplainContent;
