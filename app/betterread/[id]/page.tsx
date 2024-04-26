import Breadcrumb from '@/components/Breadcrumb';
import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import { fetchBetterreadsById } from '@/features/betterread/services/server';

type Props = { params: { id: number } };

const page = async ({ params: { id } }: Props) => {
  const sentences = await fetchBetterreadsById(id);

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label='課前準備' />
      <BetterreadForm sentences={sentences} />
    </div>
  );
};

export default page;
