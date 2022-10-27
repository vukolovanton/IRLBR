import {View, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView} from "react-native";
import {useContext, useState} from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {VIEW_STYLE} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";
import {createDateTime, validateStartTime} from "../utils/utils";

function CreateNewGame({navigation}) {
    const [roundTime, setRoundTime] = useState('');
    const [distance, setDistance] = useState('');
    const [startTime, setStartTime] = useState('');

    function handleChangeStartTime(value) {
        if (value.length > 5) return;
        setStartTime(value);
    }

    const context = useContext(SettingsContext);

    function handleSelectLocation() {
        if (!distance || !startTime || !roundTime) {
            Alert.alert("Please fill all required fields");
            return;
        }

        if (!validateStartTime(startTime)) {
            Alert.alert("Start Time is invalid");
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
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <CustomInput
                    onChangeText={setRoundTime}
                    value={roundTime}
                    label="Round time (minutes)"
                    placeholder="minutes"
                />

                <CustomInput
                    onChangeText={setDistance}
                    value={distance}
                    label="Distance (meters)"
                    placeholder="meters"
                />

                <CustomInput
                    onChangeText={handleChangeStartTime}
                    value={startTime}
                    label="Start time (HH MM)"
                    placeholder="HH.MM / HH MM"
                />
            </View>

            <KeyboardAvoidingView>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Select location"
                        onPress={handleSelectLocation}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default CreateNewGame;

const styles = StyleSheet.create({
    container: {
        ...VIEW_STYLE,
        justifyContent: 'space-between',
        flex: 1,
    },
    innerContainer: {
//        backgroundColor: 'white',
//        paddingHorizontal: 20,
//        borderRadius: 20,
//        elevation: 2,
    },
    buttonContainer: {
        marginTop: 40,
    }
})