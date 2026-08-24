'use client';

import { Highlight } from '@ark-ui/react';
import Image from 'next/image';

export type HeaderProps = {
  name: string;
  role: string;
  avatar: Avatar;
};

type Avatar = {
  src: string;
  alt: string;
};

export const Header = (props: HeaderProps) => {
  const { name, role, avatar } = props;
  return (
    <header className="flex flex-col gap-4">
      <div className="center flex size-24 border">
        <div className="center relative inline-flex size-full shrink-0 select-none overflow-hidden bg-surface-soft/24">
          <Image
            {...avatar}
            className="absolute inset-0 size-full object-cover"
            draggable={false}
            priority
            width={460}
            height={460}
          />
        </div>
      </div>
      <hgroup className="relative flex flex-col">
        <h1 id="page-title" className="font-medium font-sans text-2xl text-foreground">
          {name}
        </h1>
        <p className="font-medium font-mono text-foreground-soft text-sm uppercase">{role}</p>
      </hgroup>
    </header>
  );
};

/* ///////////////////////////////////////////////// */

export type SectionProps = {
  title: string;
  paragraphs: Paragraphs[];
};

type Paragraphs = {
  text: string;
  highlight?: string[];
};

export const Section = (props: SectionProps) => {
  const { title, paragraphs } = props;

  return (
    <section
      className="relative flex flex-col gap-y-1.5"
      aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}
    >
      <h2
        id={title.replace(/\s+/g, '-').toLowerCase()}
        className="font-medium font-sans text-foreground-accent text-lg"
      >
        {title}
      </h2>
      <div className="relative flex flex-col gap-y-2">
        {paragraphs.map(({ text, highlight = [] }, index) => (
          <p
            key={`about:section:${index}:${text}`}
            className="font-sans text-base text-foreground-prose leading-relaxed tracking-wide *:[mark]:bg-transparent *:[mark]:text-foreground-accent"
          >
            <Highlight text={text} query={highlight} />
          </p>
        ))}
      </div>
    </section>
  );
};
