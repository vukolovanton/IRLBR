import {View, StyleSheet, Alert, SafeAreaView} from "react-native";

import CustomInput from "../components/CustomInput";
import {useContext, useState} from "react";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";
import {createDateTime, validateStartTime} from "../utils/utils";

function CreateNewGame({navigation}) {
    const [roundTime, setRoundTime] = useState('');
    const [distance, setDistance] = useState('');
    const [startTime, setStartTime] = useState('');

    const context = useContext(SettingsContext);

    function handleSelectLocation() {
        if (!distance || !startTime) {
            Alert.alert("Please fill all required fields");
            return;
        }

        // TODO: Валидация дат в прошлом и что такое время вообще существует
        if (!validateStartTime(startTime)) {
            Alert.alert("Start Time format is invalid");
            return;
        }

        const formattedStartTime = createDateTime(startTime);

        context.setNewGameDetails({
            newDistance: distance,
            newStartTime: formattedStartTime,
            newRoundTime: roundTime,
        });

        navigation.navigate('LocationSelect');
    }

    return (
        <SafeAreaView>
            <CustomInput
                onChangeText={setRoundTime}
                value={roundTime}
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
                placeholder="HH.MM / HH MM"
            />

            <View style={styles.buttonContainer}>
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