import type { VariantsOf } from '@/utils/styles';

import { mergeProps, Select } from '@base-ui/react';
import { IconChevronDownMedium, IconChevronTopMedium } from '@central-icons/outlined-sharp';
import { Fragment } from 'react';

import { ScrollArea } from '../scroll-area';
import { parts } from './select.anatomy';
import * as styles from './select.styles';

/* ///////////////////////////////////////////////// */

export const Root = Select.Root;

/* ///////////////////////////////////////////////// */

export type TriggerBaseProps = VariantsOf<typeof styles.trigger>;
export type TriggerProps = Select.Trigger.Props & TriggerBaseProps;

export const Trigger = (props: TriggerProps) => {
  const { className, intent, size, ...rest } = props;

  return (
    <Select.Trigger
      {...mergeProps(parts.trigger.attrs, rest)}
      className={styles.trigger({ className, intent, size })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ValueBaseProps = VariantsOf<typeof styles.value>;
export type ValueProps = Select.Value.Props & ValueBaseProps;

export const Value = (props: ValueProps) => {
  const { className, ...rest } = props;

  return (
    <Select.Value
      {...mergeProps(parts.value.attrs, rest)}
      className={styles.value({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type IconBaseProps = VariantsOf<typeof styles.icon>;
export type IconProps = Select.Icon.Props & IconBaseProps;

export const Icon = (props: IconProps) => {
  const { className, children = <IconChevronDownMedium />, ...rest } = props;

  return (
    <Select.Icon {...mergeProps(parts.icon.attrs, rest)} className={styles.icon({ className })}>
      {children}
    </Select.Icon>
  );
};

/* ///////////////////////////////////////////////// */

export type PopupBaseProps = VariantsOf<typeof styles.popup> &
  Pick<
    Select.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignOffset' | 'alignItemWithTrigger' | 'anchor'
  > & {
    portalProps?: Select.Portal.Props;
    scrollMode?: VariantsOf<typeof styles.list>['scrollMode'];
  };

export type PopupProps = Select.Popup.Props & PopupBaseProps;

export const Popup = (props: PopupProps) => {
  const {
    className,
    children,
    anchor,
    align,
    alignOffset,
    alignItemWithTrigger = false,
    side,
    sideOffset = 4,
    portalProps,
    scrollMode = 'scrollbar',
    size,
    ...rest
  } = props;

  return (
    <Select.Portal {...portalProps}>
      <Select.Positioner
        {...parts.positioner.attrs}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        anchor={anchor}
        className={styles.positioner()}
      >
        <Select.Popup
          {...mergeProps(parts.popup.attrs, rest)}
          className={styles.popup({ className, size })}
        >
          {scrollMode === 'scrollbar' ? (
            <ScrollArea.Root className={styles.scrollArea()}>
              <ScrollArea.Viewport>
                <Select.List {...parts.list.attrs} className={styles.list({ scrollMode })}>
                  {children}
                </Select.List>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          ) : (
            <Fragment>
              <Select.ScrollUpArrow
                {...parts.scroll_up_arrow.attrs}
                className={styles.scrollUpArrow()}
              >
                <IconChevronTopMedium />
              </Select.ScrollUpArrow>
              <Select.List {...parts.list.attrs} className={styles.list({ scrollMode })}>
                {children}
              </Select.List>
              <Select.ScrollDownArrow
                {...parts.scroll_down_arrow.attrs}
                className={styles.scrollDownArrow()}
              >
                <IconChevronDownMedium />
              </Select.ScrollDownArrow>
            </Fragment>
          )}
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof styles.item>;
export type ItemProps = Select.Item.Props & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, ...rest } = props;

  return (
    <Select.Item
      {...mergeProps(parts.item.attrs, rest)}
      className={styles.item({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ItemTextBaseProps = VariantsOf<typeof styles.itemText>;
export type ItemTextProps = Select.ItemText.Props & ItemTextBaseProps;

export const ItemText = (props: ItemTextProps) => {
  const { className, ...rest } = props;

  return (
    <Select.ItemText
      {...mergeProps(parts.item_text.attrs, rest)}
      className={styles.itemText({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ItemIndicatorBaseProps = VariantsOf<typeof styles.itemIndicator>;
export type ItemIndicatorProps = Select.ItemIndicator.Props & ItemIndicatorBaseProps;

export const ItemIndicator = (props: ItemIndicatorProps) => {
  const { className, children = '✓', ...rest } = props;

  return (
    <Select.ItemIndicator
      {...mergeProps(parts.item_indicator.attrs, rest)}
      className={styles.itemIndicator({ className })}
    >
      {children}
    </Select.ItemIndicator>
  );
};

/* ///////////////////////////////////////////////// */

export type GroupBaseProps = VariantsOf<typeof styles.group>;
export type GroupProps = Select.Group.Props & GroupBaseProps;

export const Group = (props: GroupProps) => {
  const { className, ...rest } = props;

  return (
    <Select.Group
      {...mergeProps(parts.group.attrs, rest)}
      className={styles.group({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type GroupLabelBaseProps = VariantsOf<typeof styles.groupLabel>;
export type GroupLabelProps = Select.GroupLabel.Props & GroupLabelBaseProps;

export const GroupLabel = (props: GroupLabelProps) => {
  const { className, ...rest } = props;

  return (
    <Select.GroupLabel
      {...mergeProps(parts.group_label.attrs, rest)}
      className={styles.groupLabel({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type SeparatorBaseProps = VariantsOf<typeof styles.separator>;
export type SeparatorProps = Select.Separator.Props & SeparatorBaseProps;

export const Separator = (props: SeparatorProps) => {
  const { className, ...rest } = props;

  return (
    <Select.Separator
      {...mergeProps(parts.separator.attrs, rest)}
      className={styles.separator({ className })}
    />
  );
};
