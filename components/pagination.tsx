import Link from 'next/link';
import React from 'react';

export default function Pagination({ meta }: { meta: PaginationMeta }) {
  const { links, nextPage, prevPage } = meta;
  return (
    <div className="flex gap-4 ">
      <Link
        href={prevPage ? `/movies?page=${prevPage}` : '#'}
        className="cursor-pointer"
      >
        Prev
      </Link>

      {links.map((link) => (
        <Link
          key={`movies-${link.label}`}
          href={`/movies?page=${link.page}`}
          prefetch
          className="cursor-pointer"
        >
          {link.label}
        </Link>
      ))}

      <Link
        href={nextPage ? `/movies?page=${nextPage}` : '#'}
        className="cursor-pointer"
      >
        Prev
      </Link>
    </div>
  );
}
