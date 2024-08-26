import BorderLabel from '@/components/BorderLabel';
import Image from 'next/image';
import { HomepageInfo } from '../schema';
import { fetchHomepageInfosByUid } from '../services/server';

type Props = { uid: string };

const HomepageInfoListLoader = async ({ uid }: Props) => {
  const infos = await fetchHomepageInfosByUid(uid);

  return (
    <div className='grid gap-4'>
      <BorderLabel label='連絡事項' />
      <div className='grid gap-4'>
        {infos.map((info) => (
          <HomepageInfoListRow key={info.id} info={info} />
        ))}
      </div>
    </div>
  );
};

export default HomepageInfoListLoader;

const HomepageInfoListRow = ({ info }: { info: HomepageInfo }) => {
  return (
    <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
      <HomepageInfoListRowText text={info.text} />
      {info.image_url ? (
        <HomepageInfoListRowImage image_url={info.image_url} />
      ) : null}
    </div>
  );
};

const HomepageInfoListRowText = ({ text }: { text: string }) => {
  return (
    <div className='text-sm'>
      {text.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

const HomepageInfoListRowImage = ({ image_url }: { image_url: string }) => {
  return (
    <Image
      src={image_url}
      alt=''
      className='rounded-lg'
      width={512}
      height={512}
      sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
      priority={true}
    />
  );
};
