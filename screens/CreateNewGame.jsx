import {View, StyleSheet} from "react-native";
import CustomInput from "../components/CustomInput";
import {useState} from "react";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";

function CreateNewGame({ navigation }) {
    const [roundTime, setRoundTime] = useState('');
    const [distance, setDistance] = useState('');
    const [startTime, setStartTime] = useState('');

    function handleSelectLocation() {
        navigation.navigate('LocationSelect');
    }

    return (
        <View>
            <CustomInput
                onChangeText={setRoundTime}
                value={roundTime}
                keyboardType="default"
                label="Round time"
            />

            <CustomInput
                onChangeText={setDistance}
                value={distance}
                label="Distance"
            />

            <CustomInput
                onChangeText={setStartTime}
                value={startTime}
                label="Start time"
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Select location"
                    onPress={handleSelectLocation}
                    color={COLORS.SUCCESS}
                />
            </View>
        </View>
    )
}

export default CreateNewGame;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 40,
    }
})