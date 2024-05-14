import MngCanvasFormContainer from '@/features/canvas/components/MngCanvasFormContainer';
import MngNoteForm from '@/features/note/components/MngNoteForm';
import {
  fetchNote,
  fetchNoteAudioPaths,
} from '@/features/note/services/server';
import PageStateForm from '@/features/pageState/components/PageStateForm';
import { fetchPageStates } from '@/features/pageState/services/server';
import MngPaperCupForm from '@/features/paperCup/components/MngPaperCupForm/MngPaperCupForm';
import { fetchPaperCupParams } from '@/features/paperCup/services/server';
import { fetchPathnameLogs } from '@/features/pathnameLog/services/server';
import MngPitchesForm from '@/features/pitches/components/MngPitchesForm';
import {
  fetchPitches,
  fetchPitchesUser,
} from '@/features/pitches/services/server';
import MngOpenForm from '@/features/realtime/components/MngOpenForm';
import MngRecordForm from '@/features/record/components/MngRecordForm';
import {
  fetchRecordParams,
  fetchRecords,
} from '@/features/record/services/server';
import MngSpeedWorkoutForm from '@/features/speedWorkout/components/MngSpeedWorkoutForm';
import { fetchSpeedWorkout } from '@/features/speedWorkout/services/server';
import { fetchWorkoutItems } from '@/features/workout/services/server';

type Props = {};

const page = async (props: Props) => {
  const pageStates = await fetchPageStates();
  const speedWorkout = await fetchSpeedWorkout();
  const workoutItems = await fetchWorkoutItems();
  const paperCupParams = await fetchPaperCupParams();
  const recordParams = await fetchRecordParams();
  const records = await fetchRecords();
  const note = await fetchNote();
  const noteAudioPaths = await fetchNoteAudioPaths();
  const pitches = await fetchPitches();
  const pitchesUser = await fetchPitchesUser();
  const pathnameLogs = await fetchPathnameLogs();

  return (
    <div className='grid gap-8'>
      <MngOpenForm pageStates={pageStates} pathnameLogs={pathnameLogs} />
      <PageStateForm pageStates={pageStates} />
      <MngSpeedWorkoutForm
        speedWorkout={speedWorkout}
        workoutItems={workoutItems}
      />
      <MngPaperCupForm params={paperCupParams} />
      <MngNoteForm
        note={note}
        records={records}
        noteAudioPaths={noteAudioPaths}
      />
      <MngRecordForm recordParams={recordParams} records={records} />
      <MngPitchesForm pitches={pitches} pitchesUser={pitchesUser} />
      <MngCanvasFormContainer />
    </div>
  );
};

export default page;
