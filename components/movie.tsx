'use client';
import React, { useState } from 'react';
import { Card, CardBody } from '@components/card';
import Image from 'next/image';
import { PenBox } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

export default function Movie({ id, poster, title, year }: Movie) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Card className="flex flex-col gap-4 p-2 p-0 sm:p-2 ">
      <div className="aspect-[266/400] w-full">
        {loading && <Skeleton className="w-full h-full" />}
        <Image
          src={poster}
          alt={title}
          className="w-full h-full sm:rounded-lg object-cover "
          onLoad={() => setLoading(false)}
          width={300}
          height={300}
        />
      </div>
      <CardBody className="h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg flex-grow mb-4">{title}</h3>
          <p className="text-sm">{year}</p>
        </div>

        <Link
          href={`/movies/${id}/edit`}
          className="flex items-center justify-end mt-2 gap-2 text-primary"
          prefetch
        >
          <PenBox size={16} /> Edit
        </Link>
      </CardBody>
    </Card>
  );
}
