import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false на сервере и при гидратации, true после неё.
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
