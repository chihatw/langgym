import MirrorWorkoutWorkoutButton from './MirrorWorkoutWorkoutButton';
import MirrorWorkoutWorkoutButtonWrapper from './MirrorWorkoutWorkoutButtonWrapper';

type Props = {
  items: number[];
  action: (selectedNumber: number) => Promise<void>;
};

const MirrorWorkoutButtonSet = ({ items, action }: Props) => {
  return (
    <MirrorWorkoutWorkoutButtonWrapper>
      {items.map((item, index) => (
        <MirrorWorkoutWorkoutButton
          key={index}
          item={item}
          action={() => action(item)}
        />
      ))}
    </MirrorWorkoutWorkoutButtonWrapper>
  );
};

export default MirrorWorkoutButtonSet;
