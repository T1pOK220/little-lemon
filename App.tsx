import { StyleSheet,View,useColorScheme} from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import MenuFlatScreen from './screens/MenuFlatScreen';
import MenuGroupedScreen from './screens/MenuGropedScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import { lightColors,darkColors } from './theme/palette';
export default function App() {
  const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';
const colors = isDark ? darkColors : lightColors;
  const [demoEmail, setDemoEmail] = useState<string | null>(null);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]} edges={['top', 'bottom']}>
        <Header colors={colors} />
      <View style={styles.content}>
        {demoEmail === null ? 
           (<LoginScreen colors={colors} onContinue={setDemoEmail} />) : 
           (<WelcomeScreen colors={colors} email={demoEmail} onExit={() => setDemoEmail(null)}/>)
        }
      </View>
        <Footer colors={colors}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  text: {
    color: '#333333',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#EDEFEE',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content:{
    flex:1
  }
});
