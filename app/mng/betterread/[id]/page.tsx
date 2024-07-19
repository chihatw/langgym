import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import { fetchBetterreadImagePathsById } from '@/features/betterread/services/server';

type Props = {
  params: { id: string };
};

const MngBetterreadPage = async ({ params: { id } }: Props) => {
  const paths = await fetchBetterreadImagePathsById(parseInt(id));

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <BetterreadForm imagePaths={paths} />
    </div>
  );
};

export default MngBetterreadPage;
