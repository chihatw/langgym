import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

export const SwitchInput = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  if (isMobile()) {
    return (
      <Input
        name='image'
        type='file'
        capture='environment'
        accept='image/*'
        onChange={handleChange}
      />
    );
  }
  return (
    <Input name='image' type='file' accept='image/*' onChange={handleChange} />
  );
};

const isMobile = () => {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};
