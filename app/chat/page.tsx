'use client';
// subscription で表示内容を変化させるので、クライアント・コンポーネントが必須

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';

import { Database } from '@/types/supabase';
import { FormEvent, useEffect, useState } from 'react';

type Props = {};

type Message = Database['public']['Tables']['messages']['Row'];

const Chat = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    // supabase の生成は外部ファイルで行う
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!data) return;
    setMessages(data);
  };

  // メッセージ取得
  useEffect(() => {
    fetchMessages();
    // リアルタイム購読
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // メッセージ送信
  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;
    await supabase
      .from('messages')
      .insert([{ content: input, user_id: 'guest', username: 'ゲスト' }]);
    setInput('');
  }
  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <b>{msg.username}:</b> {msg.content}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type='submit'>送信</Button>
      </form>
    </div>
  );
};

export default Chat;
