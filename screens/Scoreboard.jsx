import {View, StyleSheet, Text, SafeAreaView} from "react-native";
import CustomButton from "../components/CustomButton";

function Scoreboard({navigation}) {
    function handleMainMenuPress() {
        navigation.navigate("Initial");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Game Over</Text>
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
        justifyContent: 'space-between',
    }
})