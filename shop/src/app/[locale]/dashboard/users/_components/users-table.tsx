'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';

import Table from '@/components/Table';
import { PAGE_SIZES } from '@/constant';
import { paths } from '@/constants';
import { IQueryProducts, useGetProducts } from '@/hooks/product/use-query';
import { Link } from '@/navigation';
import { IQueryUsers, useGetUsers } from '@/hooks/user/use-query';
import { avatarColors } from '@/constant/avatar-colors';

const UsersTable = () => {
  const [search, setSearch] = useState<IQueryUsers>({
    page: 1,
    limit: PAGE_SIZES[0],
    search: '',
  });

  const renderAccountType = (accountType: string) => {
    switch (accountType) {
      case 'admin':
        return <span className="rounded-md bg-primary-500 px-2 py-1 text-white">admin</span>;
      case 'customer':
        return <span className="rounded-md bg-secondary-500 px-2 py-1 text-white">customer</span>;
      default:
        return <span>{accountType}</span>;
    }
  };

  const renderBoolean = (emailVerified: boolean) => {
    if (emailVerified) {
      return (
        <span className="size-4 rounded-full bg-green-500 p-1 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      );
    } else {
      return (
        <span className="rounded-full bg-red-500 p-1 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      );
    }
  };

  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
    return avatarColors[backgroundIndex];
  };

  const { data, isLoading } = useGetUsers(search);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Table
        data={data?.users || []}
        columns={[
          {
            accessor: 'cover_image',
            title: 'Avatar',
            render: ({ avatarUrl, displayName }) => (
              <div>
                {avatarUrl ? (
                  <Image
                    alt={displayName}
                    className="rounded-md bg-gray-200 dark:bg-gray-800"
                    src={avatarUrl}
                    width={56}
                    height={56}
                  />
                ) : (
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-md text-3xl font-extrabold text-white"
                    style={{ backgroundColor: _setBgColor(displayName) }}
                  >
                    {displayName[0]}
                  </div>
                )}
              </div>
            ),
          },
          {
            accessor: 'uid',
            title: 'User ID',
            sortable: true,
            render: ({ uid }) => <div>{uid}</div>,
          },
          {
            accessor: 'email',
            title: 'Email',
            sortable: true,
            render: ({ email }) => <div>{email}</div>,
          },
          {
            accessor: 'username',
            title: 'Display Name',
            sortable: true,
            render: ({ displayName }) => <div>{displayName}</div>,
          },
          {
            accessor: 'accountType',
            title: 'Account Type',
            sortable: true,
            render: ({ accountType }) => <div>{renderAccountType(accountType)}</div>,
          },
          {
            accessor: 'emailVerified',
            title: 'Email Verified',
            sortable: false,
            render: ({ emailVerified }) => <div>{renderBoolean(emailVerified)}</div>,
          },
          {
            accessor: 'isBlocked',
            title: 'Blocked',
            sortable: false,
            render: ({ isBlocked }) => <div>{renderBoolean(isBlocked)}</div>,
          },
        ]}
        onPageChange={(page) => {
          setSearch({ ...search, page });
        }}
        onPageSizeChange={(size) => {
          setSearch({ ...search, limit: size });
        }}
        pageSize={search.limit}
        page={search.page}
        pageSizes={[10, 20, 30]}
        sortStatus={{
          columnAccessor: 'id',
          direction: 'asc',
        }}
        total={data?.total || 0}
        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
        loading={isLoading}
      />
    </div>
  );
};

export default UsersTable;
