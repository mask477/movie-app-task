import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function EditFormSkeleton() {
  return (
    <div className="w-full">
      <h1 className="text-h2 mb-20">Edit</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full order-2 sm:order-1 sm:max-w-md">
          <Skeleton className="w-full h-40 rounded-lg min-h-[500px]" />
        </div>

        <div className="flex order-1 sm:order-2 flex-col gap-2">
          <Skeleton className="w-full h-12 mb-6" />

          <div className="sm:max-w-xs w-full">
            <Skeleton className="w-full h-12 mb-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
