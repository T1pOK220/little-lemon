import { StyleSheet,ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import MenuFlatScreen from './screens/MenuFlatScreen';
import MenuGroupedScreen from './screens/MenuGropedScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
export default function App() {
  const ActiveScreen = MenuFlatScreen;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Header />
       <ActiveScreen />
        <Footer />
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
  }
});
