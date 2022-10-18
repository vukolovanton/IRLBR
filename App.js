import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './screens/Settings';
import SettingsContextProvider from './context/settingsContext';
import Initial from "./screens/Initial";
import CreateNewGame from "./screens/CreateNewGame";
import LocationSelect from "./screens/LocationSelect";
import Prepare from "./screens/Prepare";
import Game from "./screens/Game";
import Scoreboard from "./screens/Scoreboard";
import Join from "./screens/Join";
import {StatusBar} from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <>
        <StatusBar style="light-content" />
            <SettingsContextProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Initial">
                        <Stack.Screen name="Initial" component={Initial}/>
                        <Stack.Screen name="Settings" component={Settings}/>
                        <Stack.Screen name="CreateNewGame" component={CreateNewGame}/>
                        <Stack.Screen name="LocationSelect" component={LocationSelect}/>
                        <Stack.Screen name="Prepare" component={Prepare}/>
                        <Stack.Screen name="Game" component={Game}/>
                        <Stack.Screen name="Scoreboard" component={Scoreboard}/>
                        <Stack.Screen name="Join" component={Join}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SettingsContextProvider>
        </>
    );
};

export default App;
