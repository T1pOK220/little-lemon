import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { addCustomer, deleteCustomer, listCustomers, renameCustomer, type
Customer }from '../storage/customers' 
import { Palette } from '../theme/palette';
interface Props {
  colors: Palette;
}
export default function CustomersScreen({colors}: Props){
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const locked = useRef(false);
  const mounted = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCustomersCount, setAllCustomersCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    let active = true;
    setBusy(true); setError('');
    async function load() {
      try {
        const data = await listCustomers();
        setAllCustomersCount(data.length);
        if (active) { setCustomers(data); setReady(true); }
      } catch (e: unknown) {
        if (active) { setReady(false); setError(e instanceof Error ? e.message : 'Помилка бази.'); }
      } finally { if (active) setBusy(false); }
    }
    void load();
    return () => { active = false; };
  }, [attempt]);

  async function mutate(action: () => Promise<void>, clearForm = false) {
    if (locked.current || busy || !ready) return;
    locked.current = true; setBusy(true); setError('');
    let committed = false;
    try {
      await action();
      committed = true;
      if (mounted.current && clearForm) { setDraft(''); setEditingId(null); }
      const data = await listCustomers();
      if (mounted.current) setCustomers(data);
    } catch (e: unknown) {
      if (mounted.current) {
        const text = e instanceof Error ? e.message : 'Помилка бази.';
        setError(committed ? `Зміну збережено, але список не перечитано. Натисніть «Оновити список». ${text}` : text);
        if (committed) setReady(false);
      }
    } finally {
      locked.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  function confirmDelete(customer: Customer) {
    Alert.alert('Видалити клієнта?', `${customer.name} (ID ${customer.id})`, [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Видалити', style: 'destructive', onPress: () => {
        void mutate(() => deleteCustomer(customer.id), editingId === customer.id);
      } },
    ]);
  }
  return <SafeAreaView style={[styles.page, { backgroundColor: colors.background }]}>
    <Text style={[styles.heading, { color: colors.accent, alignItems: 'center' }]}>Клієнти Little Lemon</Text>
    <Button title={showForm ? 'Показати форму' : 'Показати форму'} color={colors.accent} onPress={() => setShowForm(s => !s)} />
   {showForm && <View>
     <Text style={[styles.lable, { color: colors.text }]}>
      {editingId === null ? 'Новий клієнт' : `Редагування ID ${editingId}`}
    </Text>
     <TextInput accessibilityLabel="Ім'я клієнта" placeholder="Наприклад, Іван"
      value={draft} onChangeText={setDraft} maxLength={80} editable={ready && !busy} style={[styles.input, { color: colors.text, borderColor: colors.border ,backgroundColor: colors.surface}]} />
    <Button disabled={!ready || busy || draft.trim() === ''} color={colors.accent} title={editingId === null ? 'Додати' : 'Зберегти ім\'я'}
      onPress={() => { void mutate(() => editingId === null ? addCustomer(draft) : renameCustomer(editingId, draft), true); }} />
    {editingId !== null && <Button title="Скасувати редагування" disabled={busy}
      onPress={() => { setEditingId(null); setDraft(''); }} />}
    {busy && <ActivityIndicator accessibilityLabel="Робота з базою" />}
    {error !== '' && <Text accessibilityLiveRegion="polite" style={[styles.error, { color: colors.text }]}>{error}</Text>}
   </View>
   }
    <TextInput accessibilityLabel="Ім'я клієнта" placeholder="Пошук клієнта..."
      value={searchQuery} onChangeText={setSearchQuery} maxLength={80} editable={ready && !busy} style={[styles.input, { color: colors.text, borderColor: colors.border ,backgroundColor: colors.surface}]} />
    <Button color={colors.accent} title="Оновити список" disabled={busy} onPress={() => setAttempt(n => n + 1)} />
    <Text style={[styles.lable, { color: colors.text }]}>
      {`Всього клієнтів: ${allCustomersCount}, відображено: ${filteredCustomers.length}`}
    </Text>
    <FlatList data={filteredCustomers} keyExtractor={item => String(item.id)}
      ListEmptyComponent={!busy && ready ? <Text style={[styles.error, { color: colors.text }]}>Немає клієнтів для відображення.</Text> : undefined}
      renderItem={({ item }) => <View style={styles.book}>
        <Text style={[styles.id, { color: colors.accent }]}>ID {item.id}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
        <View style={styles.buttons}>
          <Button title="Редагувати" color={colors.muted} disabled={!ready || busy} onPress={() => { setEditingId(item.id); setDraft(item.name); }} />
          <Button title="Видалити" color={colors.error} disabled={!ready || busy} onPress={() => confirmDelete(item)} />
        </View>
      </View>} />
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  page: { flex: 1, padding: 18, gap: 10, backgroundColor: '#fff' },
  heading: { fontSize: 26, fontWeight: '700', color: '#1659a5' },
  input: { borderWidth: 1, borderColor: '#718096', borderRadius: 4, padding: 12, color: '#111' },
  book: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#d8e0e8', gap: 8 },
  title: { fontSize: 18 }, buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, error: { color: '#9b2525' },
  lable: { fontSize: 16, fontWeight: '600' },
  id: { fontSize: 14, fontWeight: '600' },
});
