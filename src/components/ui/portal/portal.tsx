import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

/* ///////////////////////////////////////////////// */

const subscribe = () => () => {};

const isShadowRoot = (node: Node): node is ShadowRoot => {
  if (typeof ShadowRoot !== 'undefined' && node instanceof ShadowRoot) {
    return true;
  }

  return node.toString() === '[object ShadowRoot]';
};

const getDocument = (node: Node): Document => {
  if (node.nodeType === Node.DOCUMENT_NODE) {
    return node as unknown as Document;
  }

  return node.ownerDocument ?? document;
};

const getPortalNode = (callback: () => ShadowRoot | Document | Node) => {
  const node = callback?.();
  const rootNode = node.getRootNode();

  if (isShadowRoot(rootNode)) {
    return rootNode;
  }

  return getDocument(node).body;
};

/* ///////////////////////////////////////////////// */

export type PortalProps = React.PropsWithChildren<{
  disabled?: boolean;
  container?: React.RefObject<HTMLElement | null> | undefined;
}>;

export const Portal = (props: PortalProps) => {
  const { disabled, children } = props;

  const [container, setContainer] = React.useState(props.container?.current);
  const isServer = React.useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );

  React.useEffect(() => {
    setContainer(() => props.container?.current);
  }, [props.container]);

  if (isServer || disabled) {
    return <Fragment>{children}</Fragment>;
  }

  const node = container ?? getPortalNode(() => document);

  return (
    <Fragment>{React.Children.map(children, (child) => createPortal(child, node))}</Fragment>
  );
};
