import { fetchOpenByUid } from '../services/server';
import RealtimeModal from './RealtimeModal';

type Props = { uid: string };

const RealtimeModalContainer = async ({ uid }: Props) => {
  const isOpen = await fetchOpenByUid(uid);
  return <RealtimeModal uid={uid} isOpen={isOpen} />;
};

export default RealtimeModalContainer;
