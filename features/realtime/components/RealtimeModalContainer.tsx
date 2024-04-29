import { fetchPageStateByUid } from '@/features/pageState/services/server';
import { fetchOpenByUid } from '../services/server';
import RealtimeModal from './RealtimeModal';

type Props = { uid: string };

const RealtimeModalContainer = async ({ uid }: Props) => {
  const isOpen = await fetchOpenByUid(uid);
  const pageState = await fetchPageStateByUid(uid);
  return <RealtimeModal uid={uid} isOpen={isOpen} pageState={pageState} />;
};

export default RealtimeModalContainer;
