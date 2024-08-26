import MirrorDialog from '@/features/mirror/components/MirrorDialog/MirrorDialog';
import { MirrorWorkoutResult } from '@/features/mirror/schema';
import RedirectController from '@/features/redirectTo/components/RedirectController';

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
      <RedirectController uid={uid} />
    </>
  );
};

export default HiddenElements;
