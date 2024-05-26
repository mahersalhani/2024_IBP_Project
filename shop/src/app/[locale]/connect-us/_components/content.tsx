'use client';

import { Link } from '@/navigation';
import { Input } from '@/shared/input';
import { IoMdArrowBack } from 'react-icons/io';
import { IoMdSend } from 'react-icons/io';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Content = () => {
  return (
    <div className="relative container h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-2 bg-white">
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
        <div className="h-[85vh] border border-gray-300 overflow-auto rounded-xl"></div>

        {/* Form */}
        <div className="h-14">
          <div className="flex items-center h-full gap-5">
            <Input placeholder="Type a message" containerClass="flex-1" />
            <button type="submit" className="text-2xl text-gray-600">
              <IoMdSend />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Content;
