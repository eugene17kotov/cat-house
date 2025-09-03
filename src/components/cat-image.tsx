import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

const FALLBACK_IMAGE = '/logo.png';

export default function CatImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc || FALLBACK_IMAGE}
      alt={alt}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}
