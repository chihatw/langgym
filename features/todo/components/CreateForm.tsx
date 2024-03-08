'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { PostgrestError } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { createTodo } from '../actions';

const CreateForm = () => {
  const form = useRef<null | HTMLFormElement>(null);
  const [isPending, startTransaction] = useTransition();
  const [props, setProps] = useState({ disabled: true, errMsg: '', title: '' });

  const handleChange = () => {
    if (!form.current) return;
    const formData = new FormData(form.current);
    const title = formData.get('title');
    if (!title) {
      setProps({ disabled: true, errMsg: '', title: '' });
      return;
    }
    setProps({
      disabled: false,
      errMsg: '',
      title: title.toString(),
    });
  };

  const action = (formData: FormData) => {
    const title = String(formData.get('title'));

    startTransaction(async () => {
      try {
        const { error } = await createTodo(title);
        if (error) throw error;
        setProps((prev) => ({ ...prev, title: '', disabled: true }));
        form.current!.reset();
      } catch (error) {
        const { message } = error as PostgrestError;
        setProps((prev) => ({ ...prev, errMsg: message }));
      }
    });
  };

  return (
    <form
      ref={form}
      className='grid gap-4'
      action={action}
      onChange={handleChange}
    >
      <Input placeholder='title' name='title' />
      <Button type='submit' disabled={props.disabled || isPending}>
        {props.title ? 'Create a new Todo' : 'Please enter title'}
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {props.errMsg ? (
        <div className='text-red-500 text-xs'>{props.errMsg}</div>
      ) : null}
    </form>
  );
};

export default CreateForm;
