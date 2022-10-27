import {View, StyleSheet, Text, SafeAreaView} from "react-native";
import CustomButton from "../components/CustomButton";
import {VIEW_STYLE} from "../utils/constants";
import {useContext} from "react";
import {SettingsContext} from "../context/settingsContext";

function Initial({navigation}) {
    const context = useContext(SettingsContext);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>IRLBR</Text>
            <View style={styles.innerContainer}>
                <CustomButton
                    title='Create new game' onPress={() => {
                        context.clearAllData();
                        navigation.navigate('CreateNewGame')
                    }}
                />
                <CustomButton title='Join' onPress={() => navigation.navigate('Join')}/>
            </View>
            <View style={styles.bottomContainer}>
                <CustomButton title='Settings' onPress={() => navigation.navigate('Settings')}/>
            </View>
        </SafeAreaView>
    )
}

export default Initial;

const styles = StyleSheet.create({
    logo: {
        fontSize: 48,
        fontFamily: 'Audiowide',
        color: 'black',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        ...VIEW_STYLE,
    },
    innerContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    bottomContainer: {},
})