import { useState } from 'react';
import { Text, View,StyleSheet,TextInput, Pressable,Image,useWindowDimensions,ActivityIndicator} from 'react-native';
import type { Palette } from "../theme/palette.ts";
import {menuItems} from "../data/menu"
type DetailsScreenProps = {
colors: Palette;
id: string;
onExit: () => void;
};
function DetailsScreen({colors,id,onExit}:DetailsScreenProps) {
    const { width, height, scale, fontScale } = useWindowDimensions();
const wide = width >= 600;
const item = menuItems.find(el=>el.id===id);
return (
<View style={[styles.container,{flexDirection: wide ? 'row' : 'column'},{backgroundColor:colors.background}]}>
    <Text style={[styles.text,{color:colors.text}]}>{item?.category}</Text>
      <Text style={[styles.text,{color:colors.text}]}>{item?.name}</Text>
        <Text style={[styles.text,{color:colors.text}]}>{item?.price}грн</Text>
<Pressable
onPress={onExit}
style={[styles.btn,{backgroundColor:colors.accent}]}
>
    <Text style={[styles.text,{color:colors.onAccent}]}>Повернутися до меню</Text>
</Pressable>
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
export default DetailsScreen;