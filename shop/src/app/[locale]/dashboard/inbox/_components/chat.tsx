'use client';

import { useState } from 'react';
import ChatBox from './chat-box';
import Users from './users';
import { User } from '@shoppy/api-client';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex flex-row h-full w-full gap-5 flex-1">
      <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <ChatBox setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;
