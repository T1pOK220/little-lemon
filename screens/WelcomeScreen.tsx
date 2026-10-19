import { useState } from 'react';
import { Text, View,StyleSheet,TextInput } from 'react-native';
function WelcomeScreen() {
    const [name,setName]=useState("");
return (
<View style={styles.container}>
  <View style={styles.box}><Text style={styles.greeting}>{name.trim() ? `Вітаємо, ${name.trim()}!` : 'Введіть ім’я.'}</Text>
  <TextInput
    style={{
        width: 250,
        height: 45,
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 10,
        borderRadius:10,
        marginTop:10
    }}
    value={name}
    onChangeText={setName}
    placeholder="Введіть ім'я"
/></View>
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
        alignSelf: 'flex-start',
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
    }
});
export default WelcomeScreen