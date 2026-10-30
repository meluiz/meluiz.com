import type { ImageLoaderProps } from 'next/image';

const ORIGIN = 'https://static.meluiz.com';

export const loader = (props: ImageLoaderProps) => {
  const { src, width, quality } = props;

  if (/^https?:\/\//.test(src) && !src.startsWith(ORIGIN)) {
    return src;
  }

  const path = src.startsWith(ORIGIN) ? src.slice(ORIGIN.length) : src;
  const normalized = path.startsWith('/') ? path : `/${path}`;

  return `${ORIGIN}${normalized}?w=${width}&q=${quality ?? 75}`;
};

export default loader;
