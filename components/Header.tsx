import { View, Text, StyleSheet } from 'react-native';
export function Header() {
  return (
    <View style={styles.header}>
          <Text style={styles.logoText}>Little Lemon</Text>
          <Text style={styles.headerText}>🍋</Text>
    </View>
  );
}
export const styles = StyleSheet.create({
    header: {
        backgroundColor: '#495E57',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
    },
    logoText: {
        color: '#EDEFEE',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerText: {
        color: '#EDEFEE',
        fontSize: 18,
    }
});