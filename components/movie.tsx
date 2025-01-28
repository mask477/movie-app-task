'use client';
import React, { useState } from 'react';
import { Card, CardBody } from '@components/card';
import Image from 'next/image';
import { PenBox } from 'lucide-react';
import Link from 'next/link';

export default function Movie({ id, poster, title, year }: Movie) {
  const [loadingImage, setLoading] = useState<boolean>();

  return (
    <Card className="flex flex-col gap-4 p-2 p-0 sm:p-2 ">
      <div className="aspect-[266/400] w-full">
        <Image
          src={poster}
          alt={title}
          className="w-full h-full sm:rounded-lg object-cover "
          onLoad={() => setLoading(true)}
          width={300}
          height={300}
        />
      </div>
      <CardBody>
        <h3 className="text-lg flex-grow mb-4">{title}</h3>
        <p className="text-sm">{year}</p>

        <Link
          href={`/movies/${id}/edit`}
          className="flex items-center justify-end mt-2 gap-2 text-primary"
        >
          <PenBox size={16} /> Edit
        </Link>
      </CardBody>
    </Card>
  );
}
