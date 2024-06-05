import MirrorWorkoutButtonSet from './MirrorWorkoutButtonSet';

type Props = {
  items: number[][];
  valueIndex: number;
  action: (selectedNumber: number) => Promise<void>;
};

const MirrorWorkoutWorkoutPane = ({ items, valueIndex, action }: Props) => {
  return (
    <div className='flex justify-center'>
      {items.map((items, index) => {
        if (valueIndex !== index) return null;
        return (
          <MirrorWorkoutButtonSet key={index} items={items} action={action} />
        );
      })}
    </div>
  );
};

export default MirrorWorkoutWorkoutPane;
