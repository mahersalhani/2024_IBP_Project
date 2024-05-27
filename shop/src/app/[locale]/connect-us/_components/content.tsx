'use client';

import { Link } from '@/navigation';
import { Input } from '@/shared/input';
import { IoMdArrowBack } from 'react-icons/io';
import { IoMdSend } from 'react-icons/io';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { ENDPOINT } from '@/utils/socket';
import { useGetConversation } from '@/hooks/conversation/use-query-conversation';
import { cn } from '@/lib/utils';
import { useCreateMessage } from '@/hooks/conversation/use-mutate-conversation';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Content = () => {
  const { user } = useAuth();
  const { data } = useGetConversation();
  const scrollbarsRef = useRef<Scrollbars>(null);

  const [conversation, setConversation] = useState(data || []);
  const [message, setMessage] = useState('');
  const { createMessageMutate } = useCreateMessage();

  useEffect(() => {
    if (!data) return;
    setConversation(data);
  }, [data]);

  useEffect(() => {
    if (!user?.id) return;

    const socket = io(ENDPOINT, {
      query: { uid: user.id },
    });

    socket.on(`connect`, () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('getMessage', (message) => {
      setConversation((prev) => [...prev, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('getMessage');
    };
  }, [user?.id]);

  useEffect(() => {
    // Scroll to the bottom whenever the conversation changes
    if (scrollbarsRef.current) scrollbarsRef.current.scrollToBottom();
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    await createMessageMutate({ content: message });
    setMessage('');
  };

  return (
    <div className="relative container h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-2 bg-white">
        <Link href="/" className="flex items-center hover:underline">
          <IoMdArrowBack className="text-2xl" />
          <span className="ml-2">Back</span>
        </Link>
        <h1 className="text-xl font-bold">Connect Us</h1>
      </header>

      {/* Divider */}
      <div className="border-t border-gray-300" />

      {/* Main content */}
      <main className="px-8 py-4 lex flex-col">
        {/* Messages */}
        <div className="h-[85vh] border border-gray-300 rounded-xl p-4 space-y-2">
          <Scrollbars ref={scrollbarsRef} className="h-[85vh]" autoHide autoHideTimeout={1000} autoHideDuration={200}>
            <div className="space-y-2">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex', {
                    'justify-end': message.userId === `${user?.id}`,
                    'justify-start': message.userId !== `${user?.id}`,
                  })}
                >
                  <div
                    className={cn('px-4 py-2 rounded-xl max-w-[70%] w-fit relative', {
                      'bg-primary-500 text-white rounded-tr-none': message.userId === `${user?.id}`,
                      'bg-gray-200 rounded-tl-none': message.userId !== `${user?.id}`,
                    })}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>

        {/* Form */}
        <div className="h-14">
          <form className="flex items-center h-full gap-5" onSubmit={handleSubmit}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              containerClass="flex-1"
            />

            <button type="submit" className="text-2xl text-gray-600">
              <IoMdSend />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Content;
