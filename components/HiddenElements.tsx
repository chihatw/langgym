import MirrorDialog from '@/features/mirror/components/MirrorDialog/MirrorDialog';
import PathnameLog from '@/features/pathnameLog/components/PathnameLog';
import BackToHome from '@/features/trigger/components/BackToHome';
import RedirectToRealtime from '@/features/trigger/components/RedirectToRealtime';
import RedirectToRealtimeCanvas from '@/features/trigger/components/RedirectToRealtimeCanvas';

type Props = { uid: string; isMirrorPage?: boolean };

const HiddenElements = ({ uid, isMirrorPage }: Props) => {
  return (
    <>
      <MirrorDialog uid={uid} isMirrorPage={isMirrorPage} />
      <PathnameLog uid={uid} />
      <RedirectToRealtime uid={uid} />
      <RedirectToRealtimeCanvas uid={uid} />
      <BackToHome uid={uid} />
    </>
  );
};

export default HiddenElements;
