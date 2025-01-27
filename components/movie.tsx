'use client';
import React, { useState } from 'react';
import { Card, CardBody } from '@components/card';
import { MovieType } from '@/lib/constants';
import Image from 'next/image';

export default function Movie({ poster, title, year }: MovieType) {
  const [loadingImage, setLoading] = useState<boolean>();

  return (
    <Card className="flex flex-col gap-4">
      <Image
        src={poster}
        alt={title}
        className="w-full h-full rounded-lg"
        onLoad={() => setLoading(true)}
        width={300}
        height={300}
      />
      <CardBody>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm">{year}</p>
      </CardBody>
    </Card>
  );
}
