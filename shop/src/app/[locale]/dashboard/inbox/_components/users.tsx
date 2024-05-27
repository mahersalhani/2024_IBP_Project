'use client';

import { useGetConversations } from '@/hooks/conversation/use-query-conversation';
import { cn } from '@/lib/utils';
import Avatar from '@/shared/Avatar/Avatar';
import { User } from '@shoppy/api-client';
import React, { Dispatch, SetStateAction } from 'react';

interface UsersProps {
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  selectedUser: User | null;
}
const Users = ({ setSelectedUser, selectedUser }: UsersProps) => {
  const { data } = useGetConversations();

  return (
    <div
      className={cn('panel w-full md:block md:w-2/5 lg:w-1/4', {
        hidden: selectedUser,
      })}
    >
      <div className="panel-header">
        <h3 className="panel-title">Conversations</h3>
      </div>

      <div className="mt-4 space-y-2">
        {data?.map((conversation) => (
          <button
            onClick={() => setSelectedUser(conversation)}
            key={conversation.id}
            className={cn(
              'flex items-start gap-4 p-2 hover:bg-gray-100 cursor-pointer border border-gray-100 rounded-md w-full',
              conversation.id === selectedUser?.id && 'bg-gray-100'
            )}
          >
            <Avatar sizeClass="h-10 w-10" imgUrl={conversation.avatarUrl} username={conversation.displayName} />
            <div>
              <h4>{conversation.displayName}</h4>
              <p className={`text-xs text-gray-500`}>{conversation.email}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
