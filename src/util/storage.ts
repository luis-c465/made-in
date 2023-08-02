import { storage } from 'webextension-polyfill';

export type StorageType = 'sync' | 'local' | 'managed';
export const DEFAULT_STORAGE: StorageType = 'local';

/**
 * Get a single item from browser storage, or set it if it doesn't exist
 */
export async function useStored<T>(
  key: string,
  getter: (() => T) | (() => Promise<T>),
  storageType: StorageType = DEFAULT_STORAGE
) {
  const localItem = await get<T>(key, storageType);

  if (localItem !== null) {
    return localItem;
  }

  const item = await getter();
  set(key, item, storageType);

  return item;
}

export async function get<T>(key: string, storageType: StorageType = DEFAULT_STORAGE) {
  const { [key]: localItem } = await storage[storageType].get({ [key]: null });
  return localItem as T | null;
}

export async function set<T>(key: string, value: T, storageType: StorageType = DEFAULT_STORAGE) {
  await storage[storageType].set({ [key]: value });
}
