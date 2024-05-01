import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='max-w-lg mx-auto grid gap-8 pt-8'>
      <Skeleton className='h-48 bg-black/5' />
      <div className='grid gap-4'>
        <Skeleton className='h-8 bg-black/5' />
        <Skeleton className='h-8 bg-black/5' />
      </div>
    </div>
  );
}
