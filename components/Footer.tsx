import {StyleSheet,Text, View } from 'react-native';
import {Palette} from "../theme/palette";
type FooterProps = {
  colors:Palette,
}
export function Footer({colors}:FooterProps) {
    const year = new Date().getFullYear();
  return (
    <View style={[styles.footer,{backgroundColor:colors.surface}]}>
          <Text style={[styles.footerText,{color:colors.text}]}>© {year} Little Lemon.</Text>
    </View>
  );
}   
const styles = StyleSheet.create({
    footer: {
       backgroundColor: '#495E57',
        padding: 20,
        alignItems: 'center',   
    },
    footerText: {
        color: '#EDEFEE',
        fontSize: 18,
    }
});