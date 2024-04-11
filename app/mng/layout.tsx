import MngHeader from '@/features/mng/components/MngHeader';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-4'>
      <MngHeader />
      {children}
    </div>
  );
}
