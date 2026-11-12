import type { VariantsOf } from '@/utils/styles';

import { Menu, mergeProps, useRender } from '@base-ui/react';
import { IconChevronRight } from '@central-icons/outlined-sharp';

import { parts } from './menu.anatomy';
import * as styles from './menu.styles';

/* ///////////////////////////////////////////////// */

export const Root = Menu.Root;

/* ///////////////////////////////////////////////// */

export type TriggerBaseProps = VariantsOf<typeof styles.trigger>;
export type TriggerProps = Menu.Trigger.Props & TriggerBaseProps;

export const Trigger = (props: TriggerProps) => {
  const { className, ...rest } = props;

  return (
    <Menu.Trigger
      {...mergeProps(parts.trigger.attrs, rest)}
      className={styles.trigger({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type PopupBaseProps = VariantsOf<typeof styles.popup> &
  Pick<Menu.Positioner.Props, 'side' | 'sideOffset' | 'align' | 'alignOffset' | 'anchor'> & {
    portalProps?: Menu.Portal.Props;
  };

export type PopupProps = Menu.Popup.Props & PopupBaseProps;

export const Popup = (props: PopupProps) => {
  const {
    className,
    anchor,
    align = 'start',
    alignOffset,
    side,
    sideOffset = 4,
    portalProps,
    ...rest
  } = props;

  return (
    <Menu.Portal {...portalProps}>
      <Menu.Positioner
        {...parts.positioner.attrs}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={styles.positioner()}
      >
        <Menu.Popup
          {...mergeProps(parts.popup.attrs, rest)}
          className={styles.popup({ className })}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof styles.item>;
export type ItemProps = Menu.Item.Props & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, tone, ...rest } = props;

  return (
    <Menu.Item
      {...mergeProps(parts.item.attrs, rest)}
      className={styles.item({ className, tone })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type LinkItemBaseProps = VariantsOf<typeof styles.linkItem>;
export type LinkItemProps = Menu.LinkItem.Props & LinkItemBaseProps;

export const LinkItem = (props: LinkItemProps) => {
  const { className, tone, ...rest } = props;

  return (
    <Menu.LinkItem
      {...mergeProps(parts.link_item.attrs, rest)}
      className={styles.linkItem({ className, tone })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ShortcutBaseProps = VariantsOf<typeof styles.shortcut>;
export type ShortcutProps = useRender.ComponentProps<'span'> & ShortcutBaseProps;

export const Shortcut = (props: ShortcutProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(parts.shortcut.attrs, rest, {
      className: styles.shortcut({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export const SubmenuRoot = Menu.SubmenuRoot;

/* ///////////////////////////////////////////////// */

export type SubmenuTriggerBaseProps = VariantsOf<typeof styles.submenuTrigger>;
export type SubmenuTriggerProps = Menu.SubmenuTrigger.Props & SubmenuTriggerBaseProps;

export const SubmenuTrigger = (props: SubmenuTriggerProps) => {
  const { className, children, ...rest } = props;

  return (
    <Menu.SubmenuTrigger
      {...mergeProps(parts.submenu_trigger.attrs, rest)}
      className={styles.submenuTrigger({ className })}
    >
      {children}
      <Shortcut>
        <IconChevronRight />
      </Shortcut>
    </Menu.SubmenuTrigger>
  );
};

/* ///////////////////////////////////////////////// */

export type GroupBaseProps = VariantsOf<typeof styles.group>;
export type GroupProps = Menu.Group.Props & GroupBaseProps;

export const Group = (props: GroupProps) => {
  const { className, ...rest } = props;

  return (
    <Menu.Group
      {...mergeProps(parts.group.attrs, rest)}
      className={styles.group({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type GroupLabelBaseProps = VariantsOf<typeof styles.groupLabel>;
export type GroupLabelProps = Menu.GroupLabel.Props & GroupLabelBaseProps;

export const GroupLabel = (props: GroupLabelProps) => {
  const { className, ...rest } = props;

  return (
    <Menu.GroupLabel
      {...mergeProps(parts.group_label.attrs, rest)}
      className={styles.groupLabel({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type SeparatorBaseProps = VariantsOf<typeof styles.separator>;
export type SeparatorProps = Menu.Separator.Props & SeparatorBaseProps;

export const Separator = (props: SeparatorProps) => {
  const { className, ...rest } = props;

  return (
    <Menu.Separator
      {...mergeProps(parts.separator.attrs, rest)}
      className={styles.separator({ className })}
    />
  );
};
