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
import { useEffect, useState, useTransition } from 'react';
import { Article } from '../schema';
import { insertArticle, updateArticle } from '../services/actions';

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

  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!article) return;
    setTimeout(() => {
      setValue({
        uid: article.uid,
        date: new Date(article.date),
        title: article.title,
        errMsg: '',
        disabled: false,
      });
    }, 0); // 遅らせないと select されない？
  }, [article]);

  const create = () => {
    const newArticle: Omit<Article, 'id' | 'created_at'> = {
      uid: value.uid,
      date: value.date.toLocaleDateString(),
      title: value.title,
      audioPath: '',
      isShowAccents: false,
    };

    startTransition(async () => {
      const errMsg = await insertArticle(newArticle);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push('/mng');
    });
  };
  const update = () => {
    const item = {
      uid: value.uid,
      date: value.date.toLocaleDateString(),
      title: value.title,
    };

    startTransition(async () => {
      const errMsg = await updateArticle(article!.id, item);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push('/mng');
    });
  };

  const action = async (formData: FormData) => {
    if (!article) {
      create();
    } else {
      update();
    }
  };

  return (
    <div className='grid gap-y-4'>
      <Select
        onValueChange={(value) => {
          setValue((prev) => ({
            ...prev,
            uid: value,
            errMst: '',
            disabled: !value || !prev.title || !prev.date,
          }));
        }}
        value={value.uid}
      >
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
            onSelect={(input) => {
              if (!input) return;
              setValue((prev) => ({
                ...prev,
                date: input,
                errMsg: '',
                disabled: !prev.uid || !prev.title,
              }));
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        placeholder='title'
        name='title'
        value={value.title}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            title: e.target.value,
            errMsg: '',
            disabled: !prev.date || !prev.uid || !e.target.value,
          }))
        }
      />
      <form action={action}>
        <Button
          type='submit'
          disabled={value.disabled || isPending}
          className='flex items-center gap-x-0.5 w-full'
        >
          Submit
          {isPending ? <Loader2 className='animate-spin' /> : null}
        </Button>
      </form>
      {value.errMsg ? (
        <div className='text-xs text-red-500'>{value.errMsg}</div>
      ) : null}
    </div>
  );
};

export default ArticleForm;
