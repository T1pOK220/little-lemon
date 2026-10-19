import { useState } from "react";
import { Pressable, StyleSheet} from "react-native";
import { TextInput,Text,KeyboardAvoidingView,Platform,ScrollView,Keyboard} from "react-native";
import type { Palette } from "../theme/palette.ts";
type LoginScreenProps = {
    colors:Palette,
    onContinue:(email:string)=>void;
}
export default function LoginScreen({colors,onContinue}:LoginScreenProps){
    const [email, setEmail] = useState<string | "">("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    function isEmailFormatValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function handleContinue (){
const normalizedEmail = email.trim();
if (!isEmailFormatValid(normalizedEmail)) {
setError('Введіть email у форматі name@example.com.');
return;
}
if (password.length === 0) {
setError('Введіть навчальний пароль.');
return;
}
setError(null);
Keyboard.dismiss();
setPassword('');
onContinue(normalizedEmail);
}
return( <KeyboardAvoidingView
    style={[styles.screen,{backgroundColor:colors.background}]}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView
        contentContainerStyle={[styles.form,{backgroundColor:colors.surface}]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
       <Text style={[styles.text,{color:colors.accent}]}>Вхід до Little Lemon</Text>
       <Text style={[styles.lable,{color:colors.text}]}>Email</Text>
        <TextInput 
    style={[
styles.input,
{
color: colors.text,
backgroundColor: colors.background,
borderColor: colors.border,
},
]}
placeholderTextColor={colors.muted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel={"Email"}
        onFocus={()=>{isEmailFormatValid(email)}}
        placeholder="Email"
        />
          <Text style={[styles.lable,{color:colors.text}]}>Password</Text>
        <TextInput
   style={[
styles.input,
{
color: colors.text,
backgroundColor:colors.background,
borderColor: colors.border,
},
]}
placeholderTextColor={colors.muted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
         accessibilityLabel={"Password"}
          placeholder="Password"
          returnKeyType="done"
          submitBehavior="blurAndSubmit"/>
         {error !== null && (
            <Text style={[styles.message, { color: colors.error }]}>
            {error}</Text>)}
            <Pressable
            accessibilityRole="button"
            onPress={handleContinue}
            style={({ pressed }) => [
                styles.button,{ backgroundColor: colors.accent },pressed && styles.buttonPressed,]}>
                <Text style={[styles.buttonText, { color: colors.onAccent }]}>Увійти (демо)</Text>
</Pressable>
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
    },
 message: { fontSize: 16, lineHeight: 24, marginVertical: 12 },
 button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,},
    buttonPressed: { opacity: 0.75 },
    buttonText: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
})