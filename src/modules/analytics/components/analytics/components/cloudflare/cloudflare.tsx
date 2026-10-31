import Script from 'next/script';

/* ///////////////////////////////////////////////// */

const ENDPOINT = 'https://static.cloudflareinsights.com/beacon.min.js';

/* ///////////////////////////////////////////////// */

export interface CloudflareProps {
  token: string;
}

export const Cloudflare = (props: CloudflareProps) => {
  const { token } = props;

  return (
    <Script
      src={ENDPOINT}
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token, spa: true })}
    />
  );
};
