import { IconGithub } from 'nucleo-social-media';
import { IconLinkFill18 } from 'nucleo-ui-fill-18';
import { match } from 'ts-pattern';

import { Button } from '@/components/ui';

export type RootProps = React.PropsWithChildren;

export const Root = (props: RootProps) => {
  return (
    <section
      className="pattern-diagonal relative flex flex-col px-6 sm:px-8"
      aria-labelledby="projects-title"
    >
      <div className="flex flex-col border-stroke-soft border-x bg-surface" {...props} />
    </section>
  );
};

/* ///////////////////////////////////////////////// */

export type HeaderProps = {
  title: string;
  description: string;
};

export const Header = (props: HeaderProps) => {
  const { title, description } = props;

  return (
    <div className="flex flex-col gap-y-1 border-stroke-soft border-b px-3 py-4">
      <h2
        id="projects-title"
        className="font-medium font-mono text-base text-foreground-accent"
      >
        {title}
      </h2>
      <p className="font-sans text-foreground-soft text-sm">{description}</p>
    </div>
  );
};

/* ///////////////////////////////////////////////// */

const getLinkMeta = (type: string, name: string) => {
  return match(type)
    .with('repository', () => ({
      icon: <IconGithub size={16} aria-hidden="true" focusable="false" />,
      label: `${name} source code on GitHub`,
    }))
    .with('website', () => ({
      icon: <IconLinkFill18 size={14} aria-hidden="true" focusable="false" />,
      label: `${name} live website`,
    }))
    .otherwise(() => null);
};

export type ContentProps = {
  githubUrl: string;
  items: Array<{
    name: string;
    description: string;
    stacks: string[];
    links: Array<{
      type: string;
      href: string;
    }>;
  }>;
};

export const Content = (props: ContentProps) => {
  const { githubUrl, items } = props;

  const hasEvenItems = items.length % 2 === 0;

  const { hostname, pathname } = new URL(githubUrl);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-px bg-stroke-soft sm:grid-cols-2">
        <ul className="contents *:bg-surface *:hover:bg-surface/80">
          {items.map(({ name, description, stacks, links }) => (
            <li key={`projects:${name}:item`} className="flex flex-col gap-y-3 px-3 py-4">
              <div className="flex flex-col gap-y-1">
                <div className="center-between relative flex gap-x-3">
                  <h3 className="font-medium font-mono text-foreground text-sm">{name}</h3>
                  <div className="center-end flex shrink-0 gap-x-1.5">
                    {links.map(({ type, href }) => {
                      const meta = getLinkMeta(type, name);

                      if (!meta) {
                        return null;
                      }

                      return (
                        <a
                          key={`projects:${name}:item:${type}:link`}
                          className="center flex size-5 p-0.5 text-foreground-soft text-xs transition duration-100 ease-in-out hover:text-foreground-prose"
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${meta.label} (opens in a new tab)`}
                        >
                          {meta.icon}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <p className="line-clamp-2 font-sans text-foreground-soft text-sm">
                  {description}
                </p>
              </div>
              <ul
                className="flex flex-wrap gap-x-1.5 gap-y-1"
                aria-label={`Technologies used in ${name}`}
              >
                {stacks.map((stack) => (
                  <li
                    key={`projects:${name}:item:${stack}:stack`}
                    className="border border-stroke-inverse/8 px-1 py-0.5 font-mono text-foreground-soft text-xs lowercase hover:bg-stroke-soft/24"
                  >
                    {stack}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {!hasEvenItems && (
          <a
            href={githubUrl}
            className="center flex size-full flex-col bg-surface px-3 py-4 hover:bg-surface/80 max-sm:hover:underline"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View all projects on GitHub (opens in a new tab)"
          >
            <span className="font-medium font-mono text-foreground-prose text-sm uppercase">
              View all
            </span>
            <span className="font-medium font-sans text-foreground-soft text-sm max-sm:hidden">
              {hostname}
              {pathname}
            </span>
          </a>
        )}
      </div>
      {hasEvenItems && (
        <div className="center flex border-stroke-soft border-t">
          <Button.Root type={undefined} variant="link" size="xsmall" asChild>
            <a
              href={githubUrl}
              className="px-3 py-6 font-medium font-mono text-foreground-prose uppercase"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="View all projects on GitHub (opens in a new tab)"
            >
              View all
            </a>
          </Button.Root>
        </div>
      )}
    </div>
  );
};
