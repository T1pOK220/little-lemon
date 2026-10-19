import { StyleSheet, Text, View } from 'react-native';
import type { MenuItem } from '../types/menu';

type MenuItemRowProps = {
  item: MenuItem;
};

export default function MenuItemRow({ item }: MenuItemRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>
        {item.price.toFixed(2)} грн
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  name: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
  },
  price: {
    color: '#495E57',
    fontSize: 15,
    fontWeight: 'bold',
  },
});