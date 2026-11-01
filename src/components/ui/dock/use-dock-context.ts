import type { Toolbar } from "@base-ui/react";
import type { UseDockReturn } from "./use-dock";

import { createContext } from "@/utils/react";

export interface UseDockContext extends UseDockReturn {}

export const [DockProvider, useDockContext] = createContext<UseDockContext>({
  name: "DockContext",
  hookName: "useDockContext",
  providerName: "<DockProvider />",
});

/* ///////////////////////////////////////////////// */

export interface UseDockListContext {
  orientation: Toolbar.Root.Orientation;
}

export const [DockListProvider, useDockListContext] =
  createContext<UseDockListContext>({
    name: "DockListContext",
    strict: false,
    hookName: "useDockListContext",
    providerName: "<DockListProvider />",
  });
