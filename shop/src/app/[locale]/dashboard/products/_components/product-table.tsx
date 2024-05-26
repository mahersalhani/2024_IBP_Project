'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';

import Table from '@/components/Table';
import { PAGE_SIZES } from '@/constant';
import { paths } from '@/constants';
import { IQueryProducts, useGetProducts } from '@/hooks/product/use-query';
import { Link } from '@/navigation';

const ProductTable = () => {
  const [search, setSearch] = useState<IQueryProducts>({
    page: 1,
    limit: PAGE_SIZES[0],
    search: '',
  });

  const { data, isLoading } = useGetProducts(search);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
        {/* <div className="relative inline-block">
          <input type="checkbox" id="dropdownToggle" className="hidden peer" />
          <label
            htmlFor="dropdownToggle"
            id="dropdownActionButton"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <span className="sr-only">Action button</span>
            Action
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </label>
          <div
            id="dropdownAction"
            className="z-10 hidden peer-checked:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-1"
          >
            <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
              <li>
                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer rounded">
                  Reward
                </span>
              </li>
              <li>
                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer rounded">
                  Promote
                </span>
              </li>
              <li>
                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer rounded">
                  Activate account
                </span>
              </li>
            </ul>
            <div className="p-2">
              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer rounded">
                Delete User
              </span>
            </div>
          </div>
        </div> */}

        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setSearch({ ...search, search: e.target.value })}
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>

      <Table
        data={data?.products || []}
        columns={[
          {
            accessor: 'id',
            title: 'ID',
            render: (row) => <span>{row.id}</span>,
          },
          {
            accessor: 'image',
            title: 'Image',
            render: (row) => (
              <Image
                className="rounded-md bg-gray-100 border border-gray-100"
                src={row.coverImage}
                alt={row.name}
                width={75}
                height={75}
              />
            ),
          },
          {
            accessor: 'name',
            title: 'Name',
            render: (row) => <span>{row.name}</span>,
          },
          {
            accessor: 'price',
            title: 'Price',
            render: (row) => <span>{row.price}</span>,
          },
          {
            accessor: 'isPublished',
            title: 'Status',
            render: (row) => (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  row.isPublished ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                }`}
              >
                {row.isPublished ? 'Published' : 'Unpublished'}
              </span>
            ),
          },
          {
            accessor: 'stock',
            title: 'Stock',
            sortable: true,
            render: (row) => <span>{row.quantity}</span>,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            render: ({ slug }) => (
              <div className="flex items-center space-x-2">
                <Link href={paths.products.edit(slug)} className="text-primary-500">
                  <LuPencil size={20} />
                </Link>
              </div>
            ),
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

export default ProductTable;
