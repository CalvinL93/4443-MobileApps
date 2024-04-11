import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LogInScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/mapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}