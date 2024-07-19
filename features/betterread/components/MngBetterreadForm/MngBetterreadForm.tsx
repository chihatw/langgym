'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Article } from '@/features/article/schema';
import { fetchArticlesByUid } from '@/features/article/services/client';
import { AppUser } from '@/features/user/schema';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { insertBetterread } from '../../services/actions';

type Props = {
  users: AppUser[];
};

type FormProps = {
  uid: string;
  oppo_uid: string;
  articleId: string;
  articles: Article[];
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  uid: '',
  oppo_uid: '',
  articleId: '',
  articles: [],
  errMsg: '',
};

const MngBetterreadForm = ({ users }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!value.oppo_uid) return;

    (async () => {
      const articles = await fetchArticlesByUid(value.oppo_uid);
      setValue((prev) => ({ ...prev, articles }));
    })();
  }, [value.oppo_uid]);

  const action = async () => {
    startTransition(async () => {
      const errMsg = await insertBetterread(
        value.uid,
        parseInt(value.articleId)
      );

      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push(`/mng/betterread/list`);
    });
  };

  return (
    <div className='grid gap-8 max-w-md mx-auto '>
      <div className='text-2xl font-extrabold'>Create New Betterread</div>
      <Select
        onValueChange={(value) => {
          setValue((prev) => ({ ...prev, uid: value, errMsg: '' }));
        }}
        value={value.uid}
      >
        <SelectTrigger>
          <SelectValue placeholder='user' />
        </SelectTrigger>
        <SelectContent>
          {[...users].map((user) => (
            <SelectItem key={user.uid} value={user.uid}>
              {user.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => {
          setValue((prev) => ({ ...prev, oppo_uid: value, errMsg: '' }));
        }}
        value={value.oppo_uid}
      >
        <SelectTrigger>
          <SelectValue placeholder='oppo uid' />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.uid} value={user.uid}>
              {user.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        disabled={!value.oppo_uid}
        value={value.articleId}
        onValueChange={(value) => {
          setValue((prev) => ({ ...prev, articleId: value, errMsg: '' }));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='article' />
        </SelectTrigger>
        <SelectContent>
          {value.articles.map((article) => (
            <SelectItem key={article.id} value={article.id.toString()}>
              {article.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SubmitServerActionButton
        action={action}
        errMsg={value.errMsg}
        disabled={!value.uid || !value.oppo_uid || !value.articleId}
        isPending={isPending}
      >
        Submit
      </SubmitServerActionButton>
    </div>
  );
};

export default MngBetterreadForm;
