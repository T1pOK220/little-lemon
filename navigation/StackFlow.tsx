import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useAppColors } from '../theme/useAppColors';
import type { StackParamList } from './types';
import MenuFlatScreen from '../screens/MenuFlatScreen';
import DetailsScreen from '../screens/DetailsScreen';
const Stack = createNativeStackNavigator<StackParamList>();
type LoginProps = NativeStackScreenProps<StackParamList, 'Login'>;
type WelcomeProps = NativeStackScreenProps<StackParamList, 'Welcome'>;
type MenuProps = NativeStackScreenProps<StackParamList,"Menu">;
type DetailsProps = NativeStackScreenProps<StackParamList,"Details">;
function LoginRoute({ navigation }: LoginProps) {
const colors = useAppColors();
return <LoginScreen colors={colors} onContinue={(email) =>
navigation.navigate('Welcome', { email })
} />;
}
function WelcomeRoute({ navigation, route }: WelcomeProps) {
const colors = useAppColors();
return <WelcomeScreen
colors={colors}
email={route.params.email}
onExit={() => navigation.goBack()}
// onContinue={()=>navigation.navigate("Menu")}
/>;
}
// function MenuRoute({navigation}:MenuProps){
//     const colors = useAppColors();
//     return <MenuFlatScreen
//     colors={colors}
//     onContinue = {(itemId)=>navigation.navigate("Details",{itemId})}
//     />
// }
// function DetailsRoute({navigation,route}:DetailsProps){
//      const colors = useAppColors();
//     return <DetailsScreen
//     colors={colors}
//     id={route.params.itemId}
//     onExit={()=>navigation.goBack()}
//     />
// }
export default function StackFlow() {
return (
<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={LoginRoute}
options={{ title: 'Навчальна форма' }} />
<Stack.Screen name="Welcome" component={WelcomeRoute}
options={{ title: 'Привітання' }} />
{/* <Stack.Screen name='Menu' component={MenuRoute} options={{ title: 'Меню' }} />
<Stack.Screen name='Details' component={DetailsRoute} options={{ title: 'Про страву' }} /> */}
</Stack.Navigator>

);
}