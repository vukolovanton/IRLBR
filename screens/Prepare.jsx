import {View, StyleSheet, SafeAreaView, Text} from "react-native";
import MapboxGL from '@rnmapbox/maps';

import MapPreview from "../components/MapPreview";
import {useContext} from "react";
import {SettingsContext} from "../context/settingsContext";
import GameAreaShape from "../components/GameAreaShape";
import Timer from "../components/Timer";
import CoordinatesView from "../components/CoordinatesView";
import CustomUserLocation from "../components/CustomUserLocation";

function Prepare() {
    const context = useContext(SettingsContext);

    function handleLongPress() {}

    return(
            <SafeAreaView style={styles.container}>
                <View style={styles.map}>
                    <MapPreview
                        onLongPress={handleLongPress}
                        centerCoordinate={context.coordinates}
                        hideMainAnnotation={true}
                        >
                        <CustomUserLocation />
                        <GameAreaShape coordinates={context.gameArea}/>
                    </MapPreview>
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>BE READY</Text>
                    <CoordinatesView coordinates={context.coordinates}/>
                    <Timer />
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
        paddingHorizontal: 40,
        paddingVertical: 20,
    }
})