import {View, StyleSheet, SafeAreaView, Text} from "react-native";
import firestore from '@react-native-firebase/firestore';
import {useContext, useState} from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {VIEW_STYLE} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";

function Join({navigation}) {
    const [gameId, setGameId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const context = useContext(SettingsContext);

    function handleJoinGame() {
        let gameIdString = gameId.toString();

        if (!gameId) return;

        if (gameIdString.length === 7 && gameIdString.charAt(3) === '-') {
            gameIdString = gameIdString.replace('-','');
        }

        setIsLoading(true);

        firestore()
            .collection('Games')
            .doc(gameIdString)
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
                context.setOffsetData(data.offsetData);

                setIsLoading(false);
                setGameId('');

                navigation.navigate('Prepare', {gameId: data.gameId,});
            })
            .catch((err) => {
                console.log(err, '<--ERROR-->')
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
        ...VIEW_STYLE,
    },
})