'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, forwardRef } from 'react';
import { Box } from '../../class/Box';
import { DraggableField } from '../../class/DraggableField/DraggableField';

type Props = {
  field: DraggableField | null;
  selectedObj: Box | null;
  rerender: () => void;
};

const LabelInput = forwardRef<HTMLInputElement, Props>(
  ({ field, selectedObj, rerender }, ref) => {
    const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
      const label = e.target.value;
      if (!field || !field.selectObj) throw Error();

      // label が空文字なら box 削除
      if (!label) {
        field.delete(field.selectObj);
        rerender(); // input を更新するため
        return;
      }

      field.updateLabel(label);
      rerender(); // input を更新するため
    };

    return (
      <Input
        ref={ref}
        placeholder='label'
        // value は field.selectedObj.label
        value={selectedObj?.label || ''}
        onChange={handleChangeLabel}
        disabled={!selectedObj}
      />
    );
  }
);

export default LabelInput;

LabelInput.displayName = 'LabelInput';
