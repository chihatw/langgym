type Props = { title: string; children: React.ReactNode };

const ExplainUnitWrapper = ({ title, children }: Props) => {
  return (
    <div className='grid gap-2 text-slate-700 '>
      <div className='font-extrabold text-xl'>{title}</div>
      {children}
    </div>
  );
};

export default ExplainUnitWrapper;
