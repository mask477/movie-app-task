import React from 'react';
import { Skeleton } from './ui/skeleton';

export default function MoviesSkeleton() {
  return (
    <>
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex items-center gap-4 font-bold">
          <Skeleton className="h-[56px] w-[250px]" />
          <Skeleton className="h-12 w-12" />
        </div>

        <Skeleton className="h-[56px] w-[100px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3  lg:grid-cols-4 gap-4">
        {Array.from(Array(8).keys()).map((el) => (
          <Skeleton key={`movie-skeleton-${el}`} className="h-[390px] w-full" />
        ))}
      </div>
    </>
  );
}
