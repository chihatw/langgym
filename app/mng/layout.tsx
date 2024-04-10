import ManagementHeader from '@/features/mng/components/ManagementHeader';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-4'>
      <ManagementHeader />
      {children}
    </div>
  );
}
