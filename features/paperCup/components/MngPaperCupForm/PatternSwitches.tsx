import { Checkbox } from '@/components/ui/checkbox';
import { PaperCupBooleanParams } from '../../schema';
import { PaperCupFormProps } from './MngPaperCupForm';

type Props = {
  value: PaperCupFormProps;
  handleUpdate: (value: PaperCupBooleanParams) => void;
};

const PatternSwitches = ({ value, handleUpdate }: Props) => {
  return (
    <div className='grid gap-2 rounded bg-white/60 p-2'>
      <div className='flex items-center gap-4'>
        <div className='select-none text-xs font-extrabold'>主題</div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasWoTopic}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasWoTopic: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>ヲ格</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasNiTopic}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasNiTopic: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>ニ格</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasNoneTopic}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasNoneTopic: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>なし</label>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='select-none text-xs font-extrabold'>分類</div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasWoGrouping}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasWoGrouping: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>ヲ格</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasNiGrouping}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasNiGrouping: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>ニ格</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasNoneGrouping}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasNoneGrouping: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>なし</label>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='select-none text-xs font-extrabold'>格順</div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasStraightOrder}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasStraightOrder: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>正順</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasInvertOrder}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasInvertOrder: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>逆順</label>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='select-none text-xs font-extrabold'>肯否</div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasPositive}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasPositive: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>肯定</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasNegative}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasNegative: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>否定</label>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='select-none text-xs font-extrabold'>
          主題と分類の重複指定
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={value.hasGroupingTopic}
            onCheckedChange={(checked) => {
              const updated = {
                ...value,
                hasGroupingTopic: checked as boolean,
              };
              handleUpdate(updated);
            }}
          />
          <label>許可</label>
        </div>
      </div>
    </div>
  );
};

export default PatternSwitches;
