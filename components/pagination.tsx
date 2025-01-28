import { cn } from '@/utils/functions';
import Link from 'next/link';
import React from 'react';

export default function Pagination({ meta }: { meta: PaginationMeta }) {
  const { page, totalPages } = meta;

  console.log(
    'KEYS:',
    totalPages,
    Array(totalPages ? totalPages : 1).keys(),
    Array.from(Array(totalPages ? totalPages : 1).keys())
  );

  return (
    <div className="flex items-center justify-center gap-4">
      <Link
        href={page - 1 > 0 ? `/movies?page=${page - 1}` : '#'}
        className={cn([
          ' text-base',
          page <= 1 ? 'text-muted cursor-default' : 'text-base',
        ])}
        aria-disabled={page <= 1}
        prefetch
      >
        Prev
      </Link>

      {Array.from(Array(totalPages).keys()).map((pageParam) => {
        console.log('PAGEINTE:', { page, pageParam });

        return (
          <Link
            key={`movies-${pageParam + 1}`}
            href={
              page !== pageParam + 1 ? `/movies?page=${pageParam + 1}` : '#'
            }
            prefetch
            className={cn([
              'cursor-pointer text-base  w-8 h-8 flex justify-center items-center rounded',
              page === pageParam + 1 ? 'bg-primary' : 'bg-foreground',
            ])}
          >
            {pageParam + 1}
          </Link>
        );
      })}

      <Link
        href={page + 1 <= totalPages ? `/movies?page=${page + 1}` : '#'}
        aria-disabled={page === totalPages}
        className={cn([
          ' text-base',
          page === totalPages ? 'text-muted cursor-default' : 'text-base',
        ])}
      >
        Next
      </Link>
    </div>
  );
}
