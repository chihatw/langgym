import MngBetterreadList from '@/features/betterread/components/MngBetterreadList/MngBetterreadList';
import { BetterReadImagePathView } from '@/features/betterread/schema';
import { fetchBetterreads } from '@/features/betterread/services/server';

type Props = {};

const MngBetterreadListPage = async (props: Props) => {
  const items = await fetchBetterreads();
  const uniqueItems = items.reduce((acc, cur) => {
    const accBetterreadIds = acc.map((item) => item.betterreadId);
    if (accBetterreadIds.includes(cur.betterreadId)) {
      return acc;
    }
    return [...acc, cur];
  }, [] as BetterReadImagePathView[]);
  return <MngBetterreadList items={uniqueItems} />;
};

export default MngBetterreadListPage;
