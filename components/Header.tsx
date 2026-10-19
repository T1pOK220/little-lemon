import { View, Text, StyleSheet } from 'react-native';
import {Palette} from "../theme/palette";
type HeaderProps = {
  colors:Palette,
}
export function Header({colors}:HeaderProps) {
  return (
    <View style={[styles.header,{backgroundColor:colors.surface}]}>
          <Text style={[styles.logoText,{color:colors.text}]}>Little Lemon</Text>
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
        fontSize: 18,
    }
});