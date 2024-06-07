type Props = {
  children: React.ReactNode;
};

const MirrorWorkoutWorkoutButtonWrapper = ({ children }: Props) => {
  return (
    <div className='grid  grid-cols-[206px] sm:grid-cols-[206px,206px] gap-8'>
      {children}
    </div>
  );
};

export default MirrorWorkoutWorkoutButtonWrapper;
