import {View, StyleSheet, SafeAreaView, Alert, Text} from "react-native";
import firestore from '@react-native-firebase/firestore';
import {useContext, useState} from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";

function Join({ navigation }) {
    const [gameId, setGameId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const context = useContext(SettingsContext);

    function handleJoinGame() {
        if (!gameId) return;

        setIsLoading(true);

        firestore()
            .collection('Games')
            .doc(gameId.toString())
            .get()
            .then(documentSnapshot => {
                if (!documentSnapshot.exists) {
                    setIsError(true);
                    throw new Error("Game not found");
                }

                const data = documentSnapshot.data();
                context.setNewGameDetails({
                    newDistance: Number(data.distance),
                    newStartTime: JSON.parse(data.startTime),
                    newRoundTime: Number(data.roundTime),
                });

                context.handleChangeCoordinates(data.coordinates);
                context.createGameArea(Number(data.distance));

                setIsLoading(false);
                setGameId('');

                navigation.navigate('Prepare');
            })
            .catch((err) => {
                Alert.alert(err);
                setIsLoading(false);
                setGameId('');
            })
    }

    function handleChangeGameId(value) {
        setIsError(false);
        setGameId(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <CustomInput label="Game ID" onChangeText={handleChangeGameId} value={gameId}/>
            <View style={styles.buttonContainer}>
                <CustomButton
                    isLoading={isLoading}
                    title="Join"
                    onPress={handleJoinGame}
                    color={COLORS.SUCCESS}
                />
                {isError && <Text>Can't find game with such ID</Text>}
            </View>
        </SafeAreaView>
    )
}

export default Join;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    }
})