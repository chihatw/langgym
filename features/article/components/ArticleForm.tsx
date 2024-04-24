'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
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
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { Article } from '../schema';
import { insertArticle, updateArticle } from '../services/actions';

type Props = { users: AppUser[]; article?: Article; title: string };

type FormProps = {
  uid: string;
  date: Date;
  title: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  uid: '',
  date: new Date(),
  title: '',
  errMsg: '',
};

const ArticleForm = ({ users, article, title }: Props) => {
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
      router.push(`/?ts=${Date.now()}`);
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
      router.push('/');
    });
  };

  const action = async () => {
    !!article ? update() : create();
  };

  return (
    <div className='grid gap-8 max-w-md mx-auto '>
      <div className='text-2xl font-extrabold'>{title}</div>
      <div className='grid gap-4'>
        <Select
          onValueChange={(value) => {
            setValue((prev) => ({
              ...prev,
              uid: value,
              errMst: '',
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
        <DatePicker date={value.date} setValue={setValue} />
        <Input
          placeholder='title'
          name='title'
          value={value.title}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              title: e.target.value,
              errMsg: '',
            }))
          }
        />
        <SubmitServerActionButton
          errMsg={value.errMsg}
          disabled={!value.date || !value.uid || !value.title}
          isPending={isPending}
          action={action}
        >
          Submit
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default ArticleForm;

const DatePicker = ({
  date,
  setValue,
}: {
  date: Date;
  setValue: Dispatch<SetStateAction<FormProps>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={'outline'}
          className={'w-full pl-3 text-left font-normal justify-start'}
        >
          <CalendarIcon className='mr-2 h-4 w-4 ' />
          <div>{format(date, 'yyyy/MM/dd')}</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='center'>
        <Calendar
          mode='single'
          selected={date}
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
  );
};
