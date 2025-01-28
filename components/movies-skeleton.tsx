import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Card } from './card';

export default function MoviesSkeleton() {
  return (
    <>
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex items-center gap-4 font-bold">
          <Skeleton className="h-[56px] w-[250px] " />
          <Skeleton className="h-12 w-12 " />
        </div>

        <Skeleton className="h-[56px] w-[100px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-4">
        {Array.from(Array(8).keys()).map((el) => (
          <Card
            key={`movie-skeleton-${el}`}
            className="flex flex-col gap-4 p-2 p-0 sm:p-2"
          >
            <Skeleton className="aspect-[310/600] w-full " />
          </Card>
        ))}
      </div>
    </>
  );
}
