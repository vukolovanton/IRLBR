import {StyleSheet, Text, SafeAreaView} from "react-native";
import {useContext} from "react";

import CustomButton from "../components/CustomButton";
import {SettingsContext} from "../context/settingsContext";

function Scoreboard({navigation, route}) {
    const {failed} = route.params;
    const context = useContext(SettingsContext);
    
    function handleMainMenuPress() {
        navigation.navigate("Initial");
        context.handleChangeCoordinates(null);
        context.clearAllData();
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                failed ? <Text style={styles.title}>Pathetic</Text> : <Text style={styles.title}>Victory</Text>
            }
            <CustomButton title="Main menu" onPress={handleMainMenuPress}/>
        </SafeAreaView>
    )
}

export default Scoreboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'black',
        fontSize: 45,
        fontFamily: 'Audiowide',
        marginBottom: 40,
    },
})