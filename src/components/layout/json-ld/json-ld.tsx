import type { Graph, Thing, WithContext } from 'schema-dts';

/* ///////////////////////////////////////////////// */

export interface JsonLdProps {
  data: Graph | WithContext<Thing>;
}

export const JsonLd = (props: JsonLdProps) => {
  const { data } = props;

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be serialized into the document
      dangerouslySetInnerHTML={{
        // Escapes `<` so a value can't close the script tag
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
};
