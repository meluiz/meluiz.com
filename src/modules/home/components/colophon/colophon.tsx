import cn from 'cnfast';
import { Fragment } from 'react';

export type RootProps = React.PropsWithChildren;

export const Root = (props: RootProps) => {
  return (
    <section className="relative flex flex-col" aria-labelledby="colophon-title" {...props} />
  );
};

/* ///////////////////////////////////////////////// */

export type HeaderProps = {
  title: string;
  tagline: string;
};

export const Header = (props: HeaderProps) => {
  const { title, tagline } = props;

  return (
    <div className="center-between flex flex-col gap-y-1 border-stroke-soft border-b px-6 py-4 sm:flex-row">
      <h2 id="colophon-title" className="font-medium font-mono text-foreground text-sm">
        {title}
      </h2>
      <p className="font-sans text-foreground-soft text-sm">{tagline}</p>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export type ListProps = {
  items: FieldProps[];
  columns?: 'narrow' | 'wide';
};

export const List = (props: ListProps) => {
  const { items, columns = 'narrow' } = props;

  return (
    <div className="border-stroke-soft border-b">
      <dl
        className={cn(
          'grid gap-px bg-stroke-soft',
          columns === 'narrow' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2',
        )}
      >
        {items.map((item) => (
          <Field key={`colophon:list:${item.label}:item`} {...item} />
        ))}
      </dl>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

const Link = (props: React.PropsWithChildren<{ href: string }>) => {
  const { href, children } = props;

  return (
    <a
      href={href}
      className="underline decoration-stroke underline-offset-3 focus-visible:outline-2 focus-visible:outline-foreground-accent focus-visible:outline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
};

/* ///////////////////////////////////////////////// */

type FieldValue =
  | string
  | Array<{
      label: string;
      href?: string;
    }>;

const Value = (props: { value: FieldValue; href?: string }) => {
  const { value, href } = props;

  if (Array.isArray(value)) {
    return (
      <ul className="flex flex-col gap-y-px">
        {value.map((item) => (
          <li key={`colophon:value:${item.label}:item`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ul>
    );
  }

  if (href) {
    return <Link href={href}>{value}</Link>;
  }

  return <Fragment>{value}</Fragment>;
};

export type FieldProps = {
  label: string;
  href?: string;
  value: FieldValue;
};

export const Field = (props: FieldProps) => {
  const { label, value, href } = props;

  return (
    <div className="flex flex-col gap-y-1 bg-surface px-3 py-4">
      <dt className="font-medium text-foreground-soft text-xs uppercase">{label}</dt>
      <dd className="font-medium font-mono text-foreground-prose text-sm tracking-tight">
        <Value value={value} href={href} />
      </dd>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

export type InspirationProps = {
  items: Array<{
    label: string;
    href: string;
  }>;
};

export const Inspiration = (props: InspirationProps) => {
  const { items } = props;

  return (
    <dl className="flex flex-col gap-y-1 bg-surface px-3 py-4">
      <dt className="font-medium text-foreground-soft text-xs uppercase">Inspired by</dt>
      <dd>
        <ol
          className="grid list-inside list-decimal grid-flow-row grid-cols-1 gap-x-px gap-y-0.5 marker:font-mono marker:text-foreground-soft marker:text-sm sm:grid-flow-col sm:grid-cols-none sm:grid-rows-(--grid-rows)"
          style={{
            '--grid-rows': `repeat(${Math.ceil(items.length / 3)}, minmax(0, 1fr))`,
          }}
        >
          {items.map(({ label, href }) => (
            <li key={`colophon:inspiration:${label}:item`}>
              <a
                href={href}
                className="font-medium font-mono text-foreground-prose text-sm focus-visible:outline-2 focus-visible:outline-foreground-accent focus-visible:outline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="tracking-tight underline decoration-stroke underline-offset-3">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </dd>
    </dl>
  );
};
