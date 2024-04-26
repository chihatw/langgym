'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import {
  buildDraft,
  buildOriginalAndChinese,
  exportSelected,
} from '../services/utils';

type Props = {};

type FormProps = {
  pairs: string;
  original: string;
  chinese: string;
  draft: string;
  isCopied: boolean;
  isExportedOriginal: boolean;
  isExportedJapanese: boolean;
  isExportedChinese: boolean;
};

const INITIAL_STATE: FormProps = {
  pairs: '',
  original: '',
  chinese: '',
  draft: '',
  isCopied: false,
  isExportedOriginal: false,
  isExportedJapanese: false,
  isExportedChinese: false,
};

const DraftForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value.draft);
    setValue((prev) => ({ ...prev, isCopied: true }));
  };

  const handleExportSelected = async (
    type: 'original' | 'japanese' | 'chinese'
  ) => {
    const result: string = exportSelected(value.draft, type);
    await navigator.clipboard.writeText(result);
    setValue((prev) => {
      const cloned: FormProps = {
        ...prev,
        isExportedChinese: false,
        isExportedJapanese: false,
        isExportedOriginal: false,
      };
      switch (type) {
        case 'original':
          cloned.isExportedOriginal = true;
          break;
        case 'japanese':
          cloned.isExportedJapanese = true;
          break;
        case 'chinese':
          cloned.isExportedChinese = true;
          break;
      }
      return cloned;
    });
  };

  return (
    <div className='grid gap-8 '>
      <div className='text-2xl font-extrabold'>Draft</div>
      <Textarea
        value={value.pairs}
        placeholder='1対1'
        rows={10}
        onChange={(e) => {
          const pairs = e.target.value;

          const { original, chinese } = buildOriginalAndChinese(pairs);

          setValue((prev) => ({
            ...prev,
            pairs,
            original,
            chinese,
            draft: buildDraft(original, chinese),
            isCopied: false,
            isExportedChinese: false,
            isExportedJapanese: false,
            isExportedOriginal: false,
          }));
        }}
      />
      <Textarea
        value={value.original}
        placeholder='Original'
        rows={10}
        onChange={(e) => {
          const original = e.target.value;
          setValue((prev) => ({
            ...prev,
            original,
            draft: buildDraft(original, prev.chinese),
            isCopied: false,
            isExportedChinese: false,
            isExportedJapanese: false,
            isExportedOriginal: false,
          }));
        }}
      />
      <Textarea
        value={value.chinese}
        placeholder='Chinese'
        rows={10}
        onChange={(e) => {
          const chinese = e.target.value;
          setValue((prev) => ({
            ...prev,
            chinese,
            draft: buildDraft(prev.original, chinese),
            isCopied: false,
            isExportedChinese: false,
            isExportedJapanese: false,
            isExportedOriginal: false,
          }));
        }}
      />
      <Textarea
        value={value.draft}
        placeholder='draft'
        rows={15}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            draft: e.target.value,
            isCopied: false,
            isExportedChinese: false,
            isExportedJapanese: false,
            isExportedOriginal: false,
          }))
        }
      />
      <div className='grid gap-4'>
        <Button onClick={handleCopy} disabled={value.isCopied}>
          Copy to Clipboard
        </Button>
        <Button
          onClick={() => handleExportSelected('original')}
          disabled={value.isExportedOriginal}
        >
          原文抽出
        </Button>
        <Button
          onClick={() => handleExportSelected('japanese')}
          disabled={value.isExportedJapanese}
        >
          修正抽出
        </Button>
        <Button
          onClick={() => handleExportSelected('chinese')}
          disabled={value.isExportedChinese}
        >
          中文抽出
        </Button>
      </div>
    </div>
  );
};

export default DraftForm;
