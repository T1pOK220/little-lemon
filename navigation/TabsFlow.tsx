import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import type { TabParamList } from './types';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useAppColors } from '../theme/useAppColors';
import LoginScreen from '../screens/LoginScreen';
const Tab = createBottomTabNavigator<TabParamList>();
type LoginProps = BottomTabScreenProps<TabParamList, 'Login'>;
type WelcomeProps = BottomTabScreenProps<TabParamList, 'Welcome'>;
type IconName = ComponentProps<typeof Ionicons>['name'];
function WelcomeRoute({ navigation, route }: WelcomeProps) {
const colors = useAppColors();
return <WelcomeScreen
colors={colors}
email={route.params?.email ?? 'Гість'}
onExit={() => navigation.navigate('Login')}
/>;
}
function LoginRoute({navigation}:LoginProps){
    const colors = useAppColors();
    return <LoginScreen
    colors={colors}
    onContinue={(email) =>
navigation.navigate('Welcome', { email })
} 
    />

}
export default function TabsFlow() {
return (
<Tab.Navigator initialRouteName="Login"
screenOptions={({ route }) => ({
tabBarActiveTintColor: '#175CD3',
tabBarIcon: ({ color, size, focused }) => {
const name: IconName = route.name === 'Login'
? (focused ? 'log-in' : 'log-in-outline')
: (focused ? 'home' : 'home-outline');
return <Ionicons name={name} color={color} size={size} />;
},
})}>
<Tab.Screen name="Login" component={LoginRoute}
options={{ title: 'Форма', tabBarLabel: 'Форма' }} />
<Tab.Screen name="Welcome" component={WelcomeRoute}
options={{ title: 'Привітання', tabBarLabel: 'Привітання' }} />
</Tab.Navigator>
);
}