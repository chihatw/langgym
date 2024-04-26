import { fetchBetterreadByUid } from '../services/server';
import Betterread from './Betterread';

type Props = { uid: string };

const BetterreadContainer = async ({ uid }: Props) => {
  const betterread = await fetchBetterreadByUid(uid);

  if (!betterread) return <></>;

  return <Betterread betterread={betterread} />;
};

export default BetterreadContainer;
