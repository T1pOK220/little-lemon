import { useState } from 'react';
import { Text, View,StyleSheet,TextInput, Pressable,Image,useWindowDimensions,ActivityIndicator} from 'react-native';
import type { Palette } from "../theme/palette.ts";
type WelcomeScreenProps = {
colors: Palette;
email: string;
onExit: () => void;
// onContinue: ()=>void
};
function WelcomeScreen({colors,email,onExit}:WelcomeScreenProps) {
    const { width, height, scale, fontScale } = useWindowDimensions();
const wide = width >= 600;
return (
<View style={[styles.container,{flexDirection: wide ? 'row' : 'column'},{backgroundColor:colors.background}]}>
    <Image
    source={require('../assets/icon.png')}
style={styles.logo}
resizeMode="contain"
accessible={true}
accessibilityLabel="Логотип Little Lemon"
    />
    <Text style={[styles.text,{color:colors.text}]}>Навчальний
екран привітання для {email}</Text>
<Pressable
onPress={onExit}
style={[styles.btn,{backgroundColor:colors.accent}]}
>
    <Text style={[styles.text,{color:colors.onAccent}]}>Повернутися до форми</Text>
</Pressable>
{/* <Pressable
onPress={onContinue}
style={[styles.btn,{backgroundColor:colors.accent}]}
>
    <Text style={[styles.text,{color:colors.onAccent}]}>Перейти до меню</Text>
</Pressable> */}
</View>
);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor:"#ffffff"
    },
    accentColor: {
        color: '#EE9972',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    text: {
        color: '#333333',
        fontSize: 18,
        marginBottom: 10,
        alignContent:"center"
    },
    box:{
        backgroundColor:"#e1e1e1",
        padding:20,
        paddingBottom:40,
        alignItems:"center",

    },
    greeting:{
        fontSize:25,
        fontWeight:600
    },
    logo:{
        width:120,
        height:140,
        alignSelf:"center",
        marginBottom:16,
    },
      title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  btn:{
    marginTop:10,
    padding:10,
    alignItems:"center",
    borderRadius:12
  }
});
export default WelcomeScreen