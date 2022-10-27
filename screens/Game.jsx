import {View, StyleSheet, SafeAreaView, Text} from "react-native";
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

export const ROUND = {
    FIRST: 'FIRST',
    SECOND: 'SECOND',
    THIRD: 'THIRD',
    END: 'END',
}

export const ROUND_INDEX = {
    [ROUND.FIRST]: 0,
    [ROUND.SECOND]: 1,
    [ROUND.THIRD]: 2,
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
            navigation.navigate('Scoreboard', {
                failed: false,
            });
        } else {
            const isInGameArea = context.checkIfPlayerIsInGameArea(playerCoordinates);
            if (!isInGameArea) {
                abortGame();
                return;
            }
            context.offsetGameArea(ROUND_INDEX[roundEnum] - 1);
        }
    }

    function abortGame() {
        navigation.navigate('Scoreboard', {
            failed: true
        });
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
                    {
                        context.originalGameArea &&
                        <MapboxGL.ShapeSource shape={context.originalGameArea} id="pick">
                            <MapboxGL.FillLayer id="dick" style={{
                                fillColor: '#ed5e42',
                                fillOpacity: 0.5
                            }}/>
                            <MapboxGL.LineLayer
                                id="rick"
                                style={{
                                    lineColor: "transparent", lineWidth: 0
                                }}
                            />
                        </MapboxGL.ShapeSource>
                    }
                    <GameAreaShape coordinates={context.gameArea}/>
                </MapPreview>
            </View>
            {rounds && <View style={styles.details}>
                <Text style={styles.title}>{currentRound} ROUND</Text>

                {currentRound === ROUND.FIRST &&
                    <Timer callback={timerCallback.bind(this, ROUND.SECOND)} time={rounds[0]} light={true}/>}
                {currentRound === ROUND.SECOND &&
                    <Timer callback={timerCallback.bind(this, ROUND.THIRD)} time={rounds[1]} light={true}/>}
                {currentRound === ROUND.THIRD &&
                    <Timer callback={timerCallback.bind(this, ROUND.END)} time={rounds[2]} light={true}/>}

                <View style={styles.button}>
                    <CustomButton title="I'm dead" onPress={abortGame} color={COLORS.ERROR}/>
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
        flex: 8,
    },
    details: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        justifyContent: 'center',
        backgroundColor: COLORS.MAIN,
    },
    title: {
        color: COLORS.LIGHT,
        fontFamily: 'Audiowide',
    },
    button: {
        marginTop: 20,
    }
})