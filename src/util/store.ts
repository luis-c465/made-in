import { asyncable } from 'svelte-asyncable';
import { set, useStored } from './storage';

type Storable = NonNullable<unknown>;

export function setting<T extends Storable>(key: string, defaultValue: T) {
  return asyncable<T>(
    async () => useStored(key, () => defaultValue, 'sync'),
    (val: T) => set(key, val, 'sync')
  );
}
