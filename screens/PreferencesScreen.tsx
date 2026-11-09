import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaults, readPreferences, removePreferences, writePreferences, type Preferences } from '../storage/preferences';

const labels: Record<keyof Preferences, string> = {
pushNotifications: 'Push-сповіщення',
emailMarketing: 'Маркетингові листи',
latestNews: 'Новини ресторану',
showHints: 'Показувати підказки меню',
};
const keys: (keyof Preferences)[] = [
'pushNotifications', 'emailMarketing', 'latestNews', 'showHints'
];
export default function PreferencesScreen() {
  const [draft, setDraft] = useState<Preferences>({ ...defaults });
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [attempt, setAttempt] = useState(0);
  const lock = useRef(false);
  const mounted = useRef(false);
  const message = (e: unknown) => e instanceof Error ? e.message : String(e);
  const summary = useMemo(() => {
    const on = keys.filter(k => draft[k]).map(k => labels[k]);
    return { count: on.length, text: on.length ? on.join(', ') : 'нічого не вибрано' };
  }, [draft]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    let active = true;
    setReady(false); setNotice(''); setBusy(true);
    async function restore() {
      try {
        const saved = await readPreferences();
        if (active) { setDraft(saved); setReady(true); }
      } catch (e: unknown) {
        if (active) setNotice(message(e));
      } finally { if (active) setBusy(false); }
    }
    void restore();
    return () => { active = false; };
  }, [attempt]);

  async function persist(reset: boolean) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setNotice('');
    try {
      if (reset) await removePreferences();
      else {await writePreferences(draft)
        setNotice('Налаштування збережено.');
      };
      if (mounted.current) {
        if (reset) setDraft({ ...defaults });
        setReady(true);
        setNotice(reset ? 'Власний ключ видалено. Діють стандартні значення.' : 'Налаштування збережено.');
      }
    } catch (e: unknown) {
      if (mounted.current) setNotice(message(e));
    } finally {
      lock.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={styles.heading}>Налаштування Little Lemon</Text>
        <Text>Змініть параметри й натисніть «Зберегти».</Text>
        {busy && <ActivityIndicator accessibilityLabel="Робота зі сховищем" />}
        {ready && keys.map(key => (
          <View key={key} style={styles.row}>
            <Text>{labels[key]}</Text>
            <Switch accessibilityLabel={labels[key]} value={draft[key]} disabled={busy}
              onValueChange={value => setDraft(prev => ({ ...prev, [key]: value }))} />
          </View>
        ))}
        {ready && (
          <View accessibilityLiveRegion="polite">
            <Text style={styles.summaryTitle}>Вибрано {summary.count} із {keys.length}</Text>
            <Text>{summary.text}</Text>
          </View>
        )}
        {notice !== '' && <Text accessibilityLiveRegion="polite" style={styles.notice}>{notice}</Text>}
        <Button title="Зберегти" disabled={!ready || busy} onPress={() => { void persist(false); }} />
        <Button title="Скинути власні налаштування" disabled={busy} onPress={() => { void persist(true); }} />
        {!ready && !busy && <Button title="Повторити читання" onPress={() => setAttempt(n => n + 1)} />}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' }, page: { padding: 20, gap: 14 },
  heading: { fontSize: 26, fontWeight: '700', color: '#1659a5' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  notice: { color: '#164a78', paddingVertical: 12 },
    summaryTitle: { fontWeight: '600' },

});
