import { useState } from "react";
import { StyleSheet} from "react-native";
import { TextInput,Text,KeyboardAvoidingView,Platform,ScrollView} from "react-native";
export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function isEmailFormatValid(value: string): boolean {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
return( <KeyboardAvoidingView
    style={styles.screen}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
       <Text style={styles.text}>Вхід до Little Lemon</Text>
       <Text style={styles.lable}>Email</Text>
        <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel={"Email"}
        onFocus={()=>{isEmailFormatValid(email)}}
        placeholder="Email"
        />
          <Text style={styles.lable}>Password</Text>
        <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
         accessibilityLabel={"Password"}
          placeholder="Password"
          returnKeyType="done"
          submitBehavior="blurAndSubmit"/>
</ScrollView>
</KeyboardAvoidingView>
)
}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:"#ffffff",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:200,
    },
    form:{
        padding:40,
        backgroundColor:"#495E57",
        borderRadius:16,
        alignItems:"center"
    },
    input:{
        borderColor:"#333",
        backgroundColor:"#ffffff",
        marginBottom:20,
        marginTop:10,
        height:40,
        width:280,
        padding:10
    },
    text:{
        fontSize:24,
        fontWeight:600,
        color:"#f8e621"
    },
    lable:{
        color:"#ffffff",
        textAlign:"left",
        marginTop:10,
        fontWeight:600
    }
})