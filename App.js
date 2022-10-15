import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from './screens/Map';
import Settings from './screens/Settings';
import SettingsContextProvider from './context/settingsContext';
import Initial from "./screens/Initial";
import CreateNewGame from "./screens/CreateNewGame";
import LocationSelect from "./screens/LocationSelect";
import Prepare from "./screens/Prepare";

const Stack = createNativeStackNavigator();

const App = () => {
//TODO: проверить интеграцию Status Bar
    return (
        <SettingsContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: true}} initialRouteName="Initial">
                    <Stack.Screen name="Initial" component={Initial}/>
                    <Stack.Screen name="Settings" component={Settings}/>
                    <Stack.Screen name="CreateNewGame" component={CreateNewGame}/>
                    <Stack.Screen name="LocationSelect" component={LocationSelect}/>
                    <Stack.Screen name="Prepare" component={Prepare}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SettingsContextProvider>
    );
};

export default App;
