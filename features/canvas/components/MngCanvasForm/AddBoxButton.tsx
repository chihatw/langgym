'use client';

import { Button } from '@/components/ui/button';
import { Box } from '../../class/Box';
import { DraggableField } from '../../class/DraggableField/DraggableField';

type Props = {
  field: DraggableField | null;
  defaultLabel: string;
};

const AddBoxButton = ({ field, defaultLabel }: Props) => {
  const handleAddBox = () => {
    if (!field) throw Error();
    const box = new Box(
      (field.width - 96) / 2,
      (field.height - 48) / 2,
      defaultLabel,
      0,
      []
    );
    field.objs = [...field.objs, box];
    field.redraw('add box');
  };

  return <Button onClick={handleAddBox}>Add New Box (⌘a)</Button>;
};

export default AddBoxButton;
