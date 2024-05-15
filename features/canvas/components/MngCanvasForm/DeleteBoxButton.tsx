'use client';

import { Button } from '@/components/ui/button';
import { Box } from '../../class/Box';
import { DraggableField } from '../../class/DraggableField';
import { deleteBox } from '../../services/client';

type Props = {
  field: DraggableField | null;
  selectedObj: Box | null;
  deselect: () => void;
};

const DeleteBoxButton = ({ field, selectedObj, deselect }: Props) => {
  const handleDeleteBox = () => {
    if (!field) throw Error();

    if (!selectedObj) throw new Error();

    // canvas
    field.delete(selectedObj);

    // local
    deselect();

    // remote
    deleteBox(selectedObj.id);
  };

  return (
    <Button
      disabled={!selectedObj}
      variant={'destructive'}
      onClick={handleDeleteBox}
    >
      Delete Selected Box
    </Button>
  );
};

export default DeleteBoxButton;
