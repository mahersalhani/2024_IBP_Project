import { useAuth } from '@/context/auth-context';
import { useCreateMessage, useCreateMessageAdmin } from '@/hooks/conversation/use-mutate-conversation';
import { useGetConversationById } from '@/hooks/conversation/use-query-conversation';
import { cn } from '@/lib/utils';
import { Input } from '@/shared/input';
import { ENDPOINT } from '@/utils/socket';
import { User } from '@shoppy/api-client';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { io } from 'socket.io-client';
import { LuArrowLeft } from 'react-icons/lu';

import { Scrollbars } from 'react-custom-scrollbars-2';

interface ChatDetailsProps {
  selectedUser: User;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}
const ChatDetails = ({ selectedUser, setSelectedUser }: ChatDetailsProps) => {
  const { data } = useGetConversationById(selectedUser.id);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState(data || []);
  const { createMessageAdminMutate } = useCreateMessageAdmin();

  const scrollbarsRef = useRef<Scrollbars>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!data) return;
    setConversation(data);
  }, [data]);

  useEffect(() => {
    if (!selectedUser) return;

    const socket = io(ENDPOINT, {
      query: { uid: selectedUser.uid },
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
  }, [selectedUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    await createMessageAdminMutate({ content: message, userUID: selectedUser?.uid });
    setMessage('');
  };

  useEffect(() => {
    if (scrollbarsRef.current) scrollbarsRef.current.scrollToBottom();
  }, [conversation]);

  return (
    <div className="h-full w-full justify-between flex flex-col">
      {/* Header */}
      {selectedUser && (
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedUser(null)}
              className="text-primary-500 hover:bg-primary-500 hover:text-white rounded-full p-1"
            >
              <LuArrowLeft size={20} />
            </button>
            <h4>{selectedUser.displayName}</h4>
          </div>
        </div>
      )}

      <div className="h-[80vh] overflow-y-auto border border-gray-300 rounded-xl px-4 py-2">
        <Scrollbars ref={scrollbarsRef} className="h-[80vh]" autoHide autoHideTimeout={1000} autoHideDuration={200}>
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
    </div>
  );
};

export default ChatDetails;
