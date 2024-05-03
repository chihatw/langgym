import BorderLabel from '@/components/BorderLabel';
import { fetchBetterreadImagePathByUid } from '../services/server';
import Betterread from './Betterread';

type Props = { uid: string };

const BetterreadContainer = async ({ uid }: Props) => {
  const imagePath = await fetchBetterreadImagePathByUid(uid);

  if (!imagePath) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='課前準備' />
      <Betterread imagePath={imagePath} />
    </div>
  );
};

export default BetterreadContainer;
