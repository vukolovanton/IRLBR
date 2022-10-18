import {View, StyleSheet, SafeAreaView, Alert, Text} from "react-native";
import MapboxGL from '@rnmapbox/maps';

import MapPreview from "../components/MapPreview";
import GameAreaShape from "../components/GameAreaShape";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "../context/settingsContext";
import Timer from "../components/Timer";
import {createRoundTime} from "../utils/utils";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";
import CustomUserLocation from "../components/CustomUserLocation";

const ROUND = {
    FIRST: 'FIRST',
    SECOND: 'SECOND',
    THIRD: 'THIRD',
    END: 'END',
}

function Game({navigation}) {
    const context = useContext(SettingsContext);
    const [rounds, setRounds] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);
    const [playerCoordinates, setPlayerCoordinates] = useState(null);

    function handleLongPress() {
    }

    function timerCallback(roundEnum) {
        setCurrentRound(roundEnum);

        if (roundEnum === ROUND.END) {
            navigation.navigate('Scoreboard');
        } else {
            const isInGameArea = context.checkIfPlayerIsInGameArea(playerCoordinates);
            if (!isInGameArea) {
                navigation.navigate('Scoreboard');
                return;
            }
            context.shrinkGameArea();
        }
    }

    function handleDeadPress() {
        navigation.navigate('Initial');
    }

    useEffect(() => {
        const temp = createRoundTime(context.roundTime);
        setRounds(temp);
        setCurrentRound(ROUND.FIRST);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.map}>
                <MapPreview
                    onLongPress={handleLongPress}
                    centerCoordinate={context.coordinates}
                    hideMainAnnotation={true}
                >
                    <MapboxGL.UserLocation/>
                    <CustomUserLocation
                        playerCoordinates={playerCoordinates}
                        setPlayerCoordinates={setPlayerCoordinates}
                    />
                    <GameAreaShape coordinates={context.gameArea}/>
                </MapPreview>
            </View>
            {rounds && <View style={styles.details}>
                <Text style={styles.title}>{currentRound} ROUND</Text>

                {currentRound === ROUND.FIRST &&
                    <Timer callback={timerCallback.bind(this, ROUND.SECOND)} time={rounds[0]}/>}
                {currentRound === ROUND.SECOND &&
                    <Timer callback={timerCallback.bind(this, ROUND.THIRD)} time={rounds[1]}/>}
                {currentRound === ROUND.THIRD &&
                    <Timer callback={timerCallback.bind(this, ROUND.END)} time={rounds[2]}/>}

                <View style={styles.button}>
                    <CustomButton title="I'm dead" onPress={handleDeadPress} color={COLORS.ERROR}/>
                </View>
            </View>}
        </SafeAreaView>
    )
}

export default Game;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 5,
    },
    details: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        marginTop: 20,
    }
})