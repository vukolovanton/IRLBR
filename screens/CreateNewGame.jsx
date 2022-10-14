import {View, StyleSheet, Alert, SafeAreaView} from "react-native";
import CustomInput from "../components/CustomInput";
import {useContext, useState} from "react";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";
import Timer from "../components/Timer";

function CreateNewGame({ navigation }) {
    const [roundTime, setRoundTime] = useState('');
    const [distance, setDistance] = useState('');
    const [startTime, setStartTime] = useState('');

    const context = useContext(SettingsContext);

    function handleSelectLocation() {
        if (!distance) {
            Alert.alert("please fill all required fields");
            return;
        }
        context.setNewGameDetails({newDistance: distance})
        navigation.navigate('LocationSelect');
    }

    return (
        <SafeAreaView>
            <CustomInput
                onChangeText={setRoundTime}
                value={roundTime}
                keyboardType="default"
                label="Round time"
                placeholder="minutes"
            />

            <CustomInput
                onChangeText={setDistance}
                value={distance}
                label="Distance"
                placeholder="meters"
            />

            <CustomInput
                onChangeText={setStartTime}
                value={startTime}
                label="Start time"
            />
            <View style={styles.buttonContainer}>
                <Timer />
                <CustomButton
                    title="Select location"
                    onPress={handleSelectLocation}
                    color={COLORS.SUCCESS}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreateNewGame;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 40,
    }
})