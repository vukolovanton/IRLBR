import {View, StyleSheet, Text} from "react-native";
import CustomButton from "../components/CustomButton";

function Initial({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>IRLBR</Text>
            <View style={styles.innerContainer}>
                <CustomButton
                    title='Create new game' onPress={() => navigation.navigate('CreateNewGame')}
                />
                <CustomButton title='Join' onPress={() => navigation.navigate('Join')}/>
            </View>
            <View style={styles.bottomContainer}>
                <CustomButton title='Settings' onPress={() => navigation.navigate('Settings')}/>
            </View>
        </View>
    )
}

export default Initial;

const styles = StyleSheet.create({
    logo: {
        fontSize: 48,
        fontFamily: 'Audiowide',
        color: 'black',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 80,
    },
    innerContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    bottomContainer: {},
})