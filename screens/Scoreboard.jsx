import {StyleSheet, Text, SafeAreaView} from "react-native";
import CustomButton from "../components/CustomButton";

function Scoreboard({navigation, route}) {
    const {failed} = route.params;

    function handleMainMenuPress() {
        navigation.navigate("Initial");
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