import Breadcrumb from '@/components/Breadcrumb';
import { getUserFromServerSide } from '@/features/auth/services/server';
import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import { fetchBetterreadImagePathsById } from '@/features/betterread/services/server';
import PathnameLog from '@/features/log/components/PathnameLog';

type Props = { params: { id: number } };

const BetterreadPage = async ({ params: { id } }: Props) => {
  const imagePaths = await fetchBetterreadImagePathsById(id);
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='課前準備' />
        <BetterreadForm imagePaths={imagePaths} />
      </div>
      <PathnameLog uid={user.id} />
    </>
  );
};

export default BetterreadPage;
