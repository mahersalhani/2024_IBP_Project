'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { LuArrowDown } from 'react-icons/lu';
import { LuArrowUp } from 'react-icons/lu';
import { LuChevronRight } from 'react-icons/lu';
import { LuChevronLeft } from 'react-icons/lu';
import { FitLoader } from '../FitLoader';

type DataTableSortStatus = {
  /**
   * Sort column accessor; you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`)
   */
  columnAccessor: string;
  /**
   * Sort direction; `asc` for ascending or `desc` for descending
   */
  direction: 'asc' | 'desc';
};
//# sourceMappingURL=DataTableSortStatus.d.ts.map
// Define the Column interface
interface Column<T> {
  accessor: string;
  title: string;
  sortable?: boolean;
  render: (data: T) => ReactNode;
}

// Define the TableProps interface
interface TableProps<T> {
  data?: T[];
  columns: Column<T>[];
  total: number;
  pageSizes: number[];
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  sortStatus: DataTableSortStatus;
  onSortStatusChange?: (sortStatus: DataTableSortStatus) => void;
  paginationText?: (options: { from: number; to: number; totalRecords: number }) => ReactNode;
  loading?: boolean;
}

const Table = <T,>(props: TableProps<T>) => {
  const {
    data,
    columns,
    sortStatus,
    onPageChange,
    onPageSizeChange,
    pageSize,
    pageSizes,
    total,
    loading,
    page,
    onSortStatusChange,
    paginationText,
  } = props;

  const renderSortIcon = (columnAccessor: string) => {
    if (sortStatus.columnAccessor !== columnAccessor) return null;
    return sortStatus.direction === 'asc' ? <LuArrowUp /> : <LuArrowDown />;
  };

  const handleSort = (columnAccessor: string) => {
    if (!onSortStatusChange) return;
    const direction = sortStatus.columnAccessor === columnAccessor && sortStatus.direction === 'asc' ? 'desc' : 'asc';
    onSortStatusChange({ columnAccessor, direction });
  };

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-600">
          <tr>
            {columns?.map((column) => (
              <th
                scope="col"
                key={column.accessor}
                onClick={() => column.sortable && handleSort(column.accessor)}
                className={cn(
                  'p-4',
                  column.sortable ? 'cursor-pointer' : '',
                  sortStatus.columnAccessor === column.accessor
                    ? 'font-medium text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                )}
              >
                <div className="flex items-center justify-between">
                  {column.title}
                  {column.sortable && renderSortIcon(column.accessor)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700' : ''
              }`}
              key={index}
            >
              {columns.map((column) => (
                <td className="px-6 py-4" key={column.accessor}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          {paginationText?.({
            from: (page - 1) * pageSize + 1,
            to: Math.min(page * pageSize, total),
            totalRecords: total,
          })}
        </span>
        <TableNav page={page} total={total} pageSize={pageSize} onPageChange={onPageChange} />
      </nav>

      <FitLoader isLoading={loading} />
    </div>
  );
};

interface TableNavProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const TableNav = (props: TableNavProps) => {
  const { page, total, pageSize, onPageChange } = props;

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(Math.ceil(total / pageSize), page + 1);

  return (
    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LuChevronLeft />
        </button>
      </li>
      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
        <li key={index}>
          <button
            onClick={() => onPageChange(startPage + index)}
            className={cn(
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              page === startPage + index ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100' : ''
            )}
          >
            {startPage + index}
          </button>
        </li>
      ))}
      <li>
        <button
          disabled={page === Math.ceil(total / pageSize)}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuChevronRight />
        </button>
      </li>
    </ul>
  );
};

export default Table;
