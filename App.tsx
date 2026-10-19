import { useColorScheme,StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackFlow from './navigation/StackFlow';
import TabsFlow from './navigation/TabsFlow';
import DrawerFlow from './navigation/DrawerFlow';
const ActiveNavigator = StackFlow;
export default function App() {
const isDark = useColorScheme() === 'dark';
return (
<GestureHandlerRootView style={{ flex: 1 }}>
<SafeAreaProvider>
<NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
<ActiveNavigator />
</NavigationContainer>
</SafeAreaProvider>
</GestureHandlerRootView>
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
