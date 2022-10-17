import {View, StyleSheet, SafeAreaView} from "react-native";
import MapboxGL from '@rnmapbox/maps';
import MapPreview from "../components/MapPreview";
import GameAreaShape from "../components/GameAreaShape";
import CustomUserLocation from "../components/CustomUserLocation";
import {useContext} from "react";
import {SettingsContext} from "../context/settingsContext";

function Game() {
    const context = useContext(SettingsContext);

    function handleLongPress() {
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
                    <CustomUserLocation/>
                    <GameAreaShape coordinates={context.gameArea}/>
                </MapPreview>
            </View>
            <View style={styles.details}>
            </View>
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
    }
})