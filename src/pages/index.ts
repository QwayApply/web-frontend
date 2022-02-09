import loadable from "@loadable/component";

export const Root = loadable(() => import("./Root"));
export const SecondInput = loadable(() => import("./SecondInput"));
export const Loading = loadable(() => import("./Loading"));
export const Result = loadable(() => import("./Result"))