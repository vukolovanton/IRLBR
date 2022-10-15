import {View, StyleSheet, Text, Alert} from "react-native";
import {useContext, useEffect} from "react";
import Geolocation from 'react-native-geolocation-service';

import MapPreview from "../components/MapPreview";
import GameAreaShape from "../components/GameAreaShape";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";
import useRequestPermission from "../hooks/useRequestPermission";
import CoordinatesView from "../components/CoordinatesView";

function LocationSelect({ navigation }) {
    const context = useContext(SettingsContext);
    const requestFineLocationPermission = useRequestPermission();

    useEffect(() => {
        requestFineLocationPermission();
    }, []);

    function handleUseMyLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                if (position) {
                    const {coords} = position;
                    const {latitude, longitude} = coords;
                    if (latitude && longitude) {
                        context.handleChangeCoordinates([longitude, latitude]);
                    }
                }
            },
            (error) => {
                Alert.alert("Error while getting coordinates: " + error.code, error.message)
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000})
    }

    function handlePreviewGameArea() {
        context.createGameArea();
    }

    function handleClear() {
        context.handleChangeCoordinates(null);
    }

    function handleStart() {
        navigation.navigate('Prepare');
    }

    function handleLongPress(event) {
        const {coordinates} = event.geometry;
        if (coordinates.length === 2) {
            context.handleChangeCoordinates(coordinates, true);
            context.createGameArea({clear: true});
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapPreview
                    onLongPress={handleLongPress}
                    centerCoordinate={context.coordinates}
                >
                    <GameAreaShape coordinates={context.gameArea}/>
                </MapPreview>
            </View>
            <View style={styles.buttonsContainer}>
                <View>
                    <CustomButton title="Use my location" onPress={handleUseMyLocation}/>
                    <CustomButton title="Preview game area" onPress={handlePreviewGameArea}/>
                    <CustomButton title="Clear" onPress={handleClear} color={COLORS.ERROR}/>
                </View>
                <View>
                    <CustomButton title="Start" onPress={handleStart} color={COLORS.SUCCESS}/>
                    <CoordinatesView coordinates={context.coordinates}/>
                </View>
            </View>
        </View>
    )
}

export default LocationSelect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 3,
    },
    buttonsContainer: {
        flex: 2,
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 20,
    }
});