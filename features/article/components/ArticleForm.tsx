'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppUser } from '@/features/user/schema';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Article } from '../schema';
import { insertArticle } from '../services/actions';

type Props = { users: AppUser[]; article?: Article };

type FormProps = {
  uid: string;
  date: Date;
  title: string;
  errMsg: string;
  disabled: boolean;
};

const INITIAL_STATE: FormProps = {
  uid: '',
  date: new Date(),
  title: '',
  errMsg: '',
  disabled: true,
};

const ArticleForm = ({ users, article }: Props) => {
  const router = useRouter();
  const form = useRef<HTMLFormElement | null>(null);
  const uidInput = useRef<HTMLInputElement | null>(null);
  const dateInput = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    dateInput.current!.value = article
      ? new Date(article.date).getTime().toString()
      : INITIAL_STATE.date.getTime().toString();
  }, [article]);

  useEffect(() => {
    if (!article) return;

    // todo update の時の初期値設定
  }, [article]);

  const handleSelectUid = (input: string) => {
    uidInput.current!.value = input;
    handleChange();
  };

  const handleSelectDate = (input: Date | undefined): void => {
    if (!input) return;
    setValue((prev) => ({ ...prev, date: input }));
    dateInput.current!.value = input.getTime().toString();
    handleChange();
  };

  const handleChange = () => {
    const formData = new FormData(form.current!);
    const uid = formData.get('uid')?.toString || '';
    const date = formData.get('date')?.toString() || '';
    const title = formData.get('title')?.toString() || '';

    let disabled = false;
    if (!uid || !title || !date) {
      disabled = true;
    }
    setValue((prev) => ({ ...prev, disabled, errMsg: '' }));
  };

  const createArticle = (formData: FormData) => {
    const uid = formData.get('uid')!.toString();
    const date = formData.get('date')!.toString();
    const title = formData.get('title')!.toString();

    const newArticle: Omit<Article, 'id' | 'created_at'> = {
      uid,
      date: new Date(parseInt(date)).toLocaleDateString(),
      title,
      audioPath: '',
      isShowAccents: false,
    };

    startTransition(async () => {
      const errMsg = await insertArticle(newArticle);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push('/mng/article/list');
    });
  };
  const updateArticle = (formData: FormData) => {
    // todo update article
  };

  const action = async (formData: FormData) => {
    if (!article) {
      createArticle(formData);
    } else {
      updateArticle(formData);
    }
  };

  return (
    <form
      ref={form}
      onChange={handleChange}
      className='grid gap-y-4'
      action={action}
    >
      <input type='hidden' name='uid' ref={uidInput} />
      <Select onValueChange={handleSelectUid}>
        <SelectTrigger>
          <SelectValue placeholder='user' />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.uid}>
              {user.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type='hidden' name='date' ref={dateInput} />
      <Popover>
        <PopoverTrigger>
          <Button
            variant={'outline'}
            className={'w-full pl-3 text-left font-normal justify-start'}
          >
            <CalendarIcon className='mr-2 h-4 w-4 ' />
            <div>{format(value.date, 'yyyy/MM/dd')}</div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          <Calendar
            mode='single'
            selected={value.date}
            onSelect={handleSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input placeholder='title' name='title' />
      <Button
        type='submit'
        disabled={value.disabled || isPending}
        className='flex items-center gap-x-0.5'
      >
        Submit
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {value.errMsg ? (
        <div className='text-xs text-red-500'>{value.errMsg}</div>
      ) : null}
    </form>
  );
};

export default ArticleForm;
