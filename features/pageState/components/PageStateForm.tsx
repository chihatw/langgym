'use client';
import { Button } from '@/components/ui/button';
import { PathnameLogView } from '@/features/pathnameLog/schema';
import {
  updateBackToHomeTrigger,
  updateRedirectToRealtimeTrigger,
  updateRefreshRealtimeTrigger,
  updateRemoteLoginTrigger,
} from '@/features/trigger/services/client';
import { AppUser } from '@/features/user/schema';
import PageStateRadioGroup from './PageStateRadioGroup';
import PathnameLog from './PathnameLog';
import RealtimeToggle from './RealtimeToggle';

type Props = {
  users: AppUser[];
  pathnameLogs: PathnameLogView[];
};

const PageStateForm = ({ users, pathnameLogs }: Props) => {
  return (
    <div className='grid gap-4'>
      <div className='text-xs font-extrabold'>Page State</div>
      <div className='flex gap-4'>
        <Button
          className='h-auto w-auto p-0'
          variant={'ghost'}
          onClick={updateRemoteLoginTrigger}
        >
          Remote Log in
        </Button>
        <Button
          className='h-auto w-auto p-0'
          variant={'ghost'}
          onClick={updateRedirectToRealtimeTrigger}
        >
          Redirect to Realtime
        </Button>
        <Button
          className='h-auto w-auto p-0'
          variant={'ghost'}
          onClick={updateBackToHomeTrigger}
        >
          Back to Home
        </Button>
        <Button
          className='h-auto w-auto p-0'
          variant={'ghost'}
          onClick={updateRefreshRealtimeTrigger}
        >
          Refresh Realtime
        </Button>
      </div>
      <div className='grid gap-4'>
        {users.map((user, index) => (
          <div key={index} className='p-2 rounded bg-white/60 grid gap-2 '>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='text-xs font-extrabold'>{user.display}</div>
                <RealtimeToggle user={user} />
              </div>
              <PathnameLog
                pathnameLog={pathnameLogs.find((log) => log.uid === user.uid)}
              />
            </div>
            <PageStateRadioGroup user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageStateForm;
