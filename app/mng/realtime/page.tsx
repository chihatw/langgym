import MngRealtimeBetterreadForm from '@/features/betterread/components/MngRealtimeBetterreadForm/MngRealtimeBetterreadForm';
import {
  fetchBetterreads,
  fetchBetterreadToggle,
} from '@/features/betterread/services/server';

import MngMirrorForm from '@/features/mirror/components/MngMirrorForm/MngMirrorForm';

import MngPitchesForm from '@/features/pitches/components/MngPitchesForm';
import {
  fetchPitches,
  fetchPitchesUser,
} from '@/features/pitches/services/server';
import MngRedirectToFormLoader from '@/features/redirectTo/components/MngRedirectToForm/MngRedirectToFormLoader';

type Props = {};

const page = async (props: Props) => {
  const pitches = await fetchPitches();
  const pitchesUser = await fetchPitchesUser();
  const betterreads = await fetchBetterreads();
  const betterreadToggle = await fetchBetterreadToggle();

  return (
    <div className='grid gap-8'>
      <MngRedirectToFormLoader />
      <MngRealtimeBetterreadForm
        betterreads={betterreads}
        betterreadToggle={betterreadToggle!}
      />

      <MngPitchesForm pitches={pitches} pitchesUser={pitchesUser} />
      <MngMirrorForm />
    </div>
  );
};

export default page;
