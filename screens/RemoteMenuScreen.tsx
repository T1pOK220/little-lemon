import {
ActivityIndicator,
FlatList,
Pressable,
StyleSheet,
Text,
TextInput,
View,
} from 'react-native';
import { MENU_URL } from '../api/remoteMenu';
import { useRemoteMenu } from '../hooks/useRemoteMenu';
import { useAppColors } from '../theme/useAppColors';
import { useMemo, useState } from 'react';
export default function RemoteMenuScreen() {
const colors = useAppColors();
const [searchQuery, setSearchQuery] = useState('');
const { state, reload } = useRemoteMenu(MENU_URL);
const loading = state.status === 'loading';
const filteredItems = useMemo(() => {
  return state.status === 'success'
    ? state.data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
}, [state.status === 'success' ? state.data : [], searchQuery]);
return (
<View style={[styles.screen, { backgroundColor: colors.background }]}>
<Text style={[styles.heading, { color: colors.text }]}>Меню з мережі</Text>
<TextInput
placeholder="Пошук..."
value={searchQuery}
onChangeText={setSearchQuery}
style={[styles.input, { color: colors.text, borderColor: colors.border }]}
/>
<Pressable
accessibilityRole="button"
disabled={loading}
onPress={reload}
style={({ pressed }) => [
styles.button,
{ backgroundColor: colors.accent },
(pressed || loading) && styles.dimmed,
]}
>
<Text style={[styles.buttonText, { color: colors.onAccent }]}>
{loading ? 'Завантаження...' : state.status === 'error' ? 'Повторити' : 'Оновити'}
</Text>
</Pressable>
{state.status === 'loading' && (
<View style={styles.center}>
<ActivityIndicator size="large" color={colors.accent} />
<Text style={{ color: colors.text }}>Отримуємо меню...</Text>
</View>
)}
{state.status === 'error' && (
<View style={styles.center}>
<Text accessibilityRole="alert" style={{ color: colors.error }}>
{state.message}
</Text>
<Text style={{ color: colors.muted }}>
Перевірте з’єднання та натисніть «Повторити».
</Text>
</View>
)}

{state.status === 'success' && (
<FlatList
style={styles.list}
data={filteredItems}
  keyExtractor={item => item.id}
  ListHeaderComponent={() => (
    <Text style={[styles.heading, { color: colors.text }]}>
      {filteredItems.length} позицій у меню
    </Text>
  )}
ListEmptyComponent={
  <Text style={{ color: colors.text }}>
    {state.data.length === 0
      ? 'Меню порожнє'
      : 'За цим запитом нічого не знайдено'}
  </Text>
}
renderItem={({ item }) => (
<View
style={[
styles.card,
{ backgroundColor: colors.surface, borderColor: colors.border },
]}
>
<Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
<Text style={{ color: colors.muted }}>{item.category}</Text>
<Text style={{ color: colors.text }}>{item.price.toFixed(2)} ум. од.</Text>
</View>
)}
/>
)}
</View>
);
}
const styles = StyleSheet.create({
screen: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
heading: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
button: { padding: 12, borderRadius: 6, alignItems: 'center' },
buttonText: { fontSize: 16, fontWeight: '600' },
dimmed: { opacity: 0.6 },
center: { flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center' },
list: { flex: 1 },
content: { paddingVertical: 16, paddingBottom: 24 },
card: { padding: 14, borderWidth: 1, borderRadius: 6, marginBottom: 12, gap: 6 },
title: { fontSize: 18, fontWeight: '600' },
input: {
padding: 10,
borderWidth: 1,
borderRadius: 6,
marginBottom: 12,}
});