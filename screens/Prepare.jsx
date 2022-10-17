import {View, StyleSheet, SafeAreaView, Text} from "react-native";
import {useContext} from "react";
import MapboxGL from '@rnmapbox/maps';

import MapPreview from "../components/MapPreview";
import {SettingsContext} from "../context/settingsContext";
import GameAreaShape from "../components/GameAreaShape";
import Timer from "../components/Timer";
import CoordinatesView from "../components/CoordinatesView";

function Prepare({ navigation }) {
    const context = useContext(SettingsContext);

    function handleLongPress() {
    }

    function navigaeToGameScreen() {
        navigation.navigate('Game');
    }

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
                <CoordinatesView coordinates={context.coordinates}/>
                <Timer time={context.startTime} callback={navigaeToGameScreen} />
            </View>
        </SafeAreaView>
    )
}

export default Prepare;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 24,
    },
    container: {
        flex: 1,
    },
    map: {
        flex: 3,
    },
    details: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
    }
})