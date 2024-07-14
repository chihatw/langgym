import MirrorDialog from '@/features/mirror/components/MirrorDialog/MirrorDialog';
import { MirrorWorkoutResult } from '@/features/mirror/schema';
import PathnameLog from '@/features/pathnameLog/components/PathnameLog';
import RedirectController from '@/features/redirectTo/components/RedirectController';
import BackToHome from '@/features/trigger/components/BackToHome';
import RedirectToRealtime from '@/features/trigger/components/RedirectToRealtime';
import RedirectToRealtimeCanvas from '@/features/trigger/components/RedirectToRealtimeCanvas';

type Props = {
  uid: string;
  cheat?: boolean;
  latestMirrorResult?: MirrorWorkoutResult;
};

const HiddenElements = ({ uid, cheat, latestMirrorResult }: Props) => {
  return (
    <>
      <MirrorDialog
        uid={uid}
        cheat={cheat}
        latestMirrorResult={latestMirrorResult}
      />
      <PathnameLog uid={uid} />
      <RedirectController uid={uid} />
      {/* merge to RedirectController, then delete */}
      <RedirectToRealtime uid={uid} />
      <RedirectToRealtimeCanvas uid={uid} />
      <BackToHome uid={uid} />
    </>
  );
};

export default HiddenElements;
