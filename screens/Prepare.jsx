import {View, StyleSheet, SafeAreaView, Text} from "react-native";
import {useContext, useEffect} from "react";
import MapboxGL from '@rnmapbox/maps';

import MapPreview from "../components/MapPreview";
import {SettingsContext} from "../context/settingsContext";
import GameAreaShape from "../components/GameAreaShape";
import Timer from "../components/Timer";
import GameIdView from "../components/GameIdView";
import {CARD_STYLE, COLORS} from "../utils/constants";

function Prepare({route, navigation}) {
    const context = useContext(SettingsContext);
    const {gameId} = route.params;

    function handleLongPress() {
    }

    function navigateToGameScreen() {
        navigation.navigate('Game');
    }

    useEffect(() => {
        if (!context.gameArea) {
            context.createGameArea(context.distance, context.coordinates, {setOriginalGameArea: true});
        }
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
                    <GameAreaShape coordinates={context.gameArea}/>
                </MapPreview>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>BE READY</Text>
                <GameIdView gameId={gameId}/>
                <View style={styles.innerContainer}>
                    <Timer time={context.startTime} callback={navigateToGameScreen}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Prepare;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: 'black',
        fontFamily: 'Audiowide',
        marginBottom: 24,
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        marginTop: 24,
    },
    map: {
        flex: 4,
    },
    details: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: COLORS.ACCENT,
        ...CARD_STYLE
    }
})