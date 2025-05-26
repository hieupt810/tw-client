'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt || 'Image'}
      {...props}
      onError={() => setImageSrc('https://placehold.co/1000.png?text=No+Image')}
    />
  );
}
