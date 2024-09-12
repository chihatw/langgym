import MngBetterreadList from '@/features/betterread/components/MngBetterreadList/MngBetterreadList';
import { fetchBetterreads } from '@/features/betterread/services/server';

type Props = {};

const MngBetterreadListPage = async (props: Props) => {
  const betterreads = await fetchBetterreads();

  return <MngBetterreadList betterreads={betterreads} />;
};

export default MngBetterreadListPage;
