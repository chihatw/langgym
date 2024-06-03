import MirrorWorkoutWorkoutButton from './MirrorWorkoutWorkoutButton';

type Props = {
  items: number[];
  action: (selectedNumber: number) => Promise<void>;
};

const MirrorWorkoutButtonSet = ({ items, action }: Props) => {
  return (
    <div className='grid  grid-cols-1 sm:grid-cols-2 gap-8'>
      {items.map((item, index) => (
        <MirrorWorkoutWorkoutButton
          key={index}
          item={item}
          action={() => action(item)}
        />
      ))}
    </div>
  );
};

export default MirrorWorkoutButtonSet;
