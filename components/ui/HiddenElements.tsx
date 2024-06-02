import PathnameLog from '@/features/pathnameLog/components/PathnameLog';
import BackToHome from '@/features/trigger/components/BackToHome';
import RedirectToRealtime from '../../features/trigger/components/RedirectToRealtime';

type Props = { uid: string };

const HiddenElements = ({ uid }: Props) => {
  return (
    <>
      <PathnameLog uid={uid} />
      <RedirectToRealtime uid={uid} />
      <BackToHome uid={uid} />
    </>
  );
};

export default HiddenElements;
