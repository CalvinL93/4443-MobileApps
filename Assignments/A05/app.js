import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import HomeScreen from './screens/homeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LogInScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/mapScreen';
import ChatScreen from './screens/ChatScreen';
import CameraScreen from './screens/CameraScreen';
import ImagesPage from './screens/ImagesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Images" component={ImagesPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}