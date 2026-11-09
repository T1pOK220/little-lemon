import AsyncStorage from '@react-native-async-storage/async-storage';
export type Preferences = {
pushNotifications: boolean;
emailMarketing: boolean;
latestNews: boolean;
showHints: boolean;
};
export const defaults: Preferences = {
pushNotifications: false, emailMarketing: false, latestNews: false, showHints: false
};
export const KEY = '@little-lemon/preferences/v1';
export function parsePreferences(raw: string | null): Preferences {
  if (raw === null) return { ...defaults };
  const value: unknown = JSON.parse(raw);
  if (typeof value !== 'object' || value === null ||
      !('version' in value) || value.version !== 1 || !('data' in value)) {
    throw new Error('Невідомий формат налаштувань.');
  }
  const p = value.data;
  if (typeof p !== 'object' || p === null ||
      !('pushNotifications' in p) || typeof p.pushNotifications !== 'boolean' ||
      !('emailMarketing' in p) || typeof p.emailMarketing !== 'boolean' ||
      !('latestNews' in p) || typeof p.latestNews !== 'boolean') {
    throw new Error('Пошкоджені налаштування.');
  }
  let showHints = defaults.showHints;
  if ('showHints' in p) {
    if (typeof p.showHints !== 'boolean') throw new Error('Пошкоджені налаштування.');
    showHints = p.showHints;
  }
  return {
    pushNotifications: p.pushNotifications,
    emailMarketing: p.emailMarketing,
    latestNews: p.latestNews,
    showHints,
  };
}
export async function readPreferences(): Promise<Preferences> {
return parsePreferences(await AsyncStorage.getItem(KEY));

}
export async function writePreferences(data: Preferences): Promise<void> {
await AsyncStorage.setItem(KEY, JSON.stringify({ version: 1, data }));
}
export async function removePreferences(): Promise<void> {
await AsyncStorage.removeItem(KEY);
}