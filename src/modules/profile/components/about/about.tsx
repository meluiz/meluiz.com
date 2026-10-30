import { Highlight, Section } from '@/components/ui';

import { about } from './about.styles';

export const About = () => {
  const styles = about();

  return (
    <div className={styles.root}>
      <Section.Root id="me-in-10-seconds" index={1} className={styles.section}>
        <Section.Title>
          <Section.Index />
          Me in 10 seconds
        </Section.Title>
        <Section.Body indent>
          <p className={styles.text}>
            <Highlight
              query={['Minas Gerais, Brazil', 'Grupo Plan Marketing']}
              text="Hi! I'm Luiz Felipe, a Front-end Developer based in Minas Gerais, Brazil, currently at Grupo Plan Marketing. I've shipped products across health, media, and Web3, always chasing the details that make interfaces feel clearer and faster."
            />
          </p>
        </Section.Body>
      </Section.Root>
      <Section.Root id="how-i-work" index={2} className={styles.section}>
        <Section.Title>
          <Section.Index />
          How I work
        </Section.Title>
        <Section.Body indent>
          <p className={styles.text}>
            <Highlight
              query="design and engineering"
              text="My work lives between design and engineering — I care as much about how an interface behaves and performs as how it looks. Mainly TypeScript, React, Next.js, and Tailwind CSS, staying close to the design side with Figma."
            />
          </p>
          <p className={styles.text}>
            <Highlight
              query="Memojs, Motiro and Tailugin"
              text="On the side I build small open-source tools like Memojs, Motiro and Tailugin, where I explore reusable APIs, developer experience, and clean, reusable code."
            />
          </p>
        </Section.Body>
      </Section.Root>
    </div>
  );
};
