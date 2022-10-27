import {View, StyleSheet, Alert} from "react-native";
import {useContext, useEffect, useState} from "react";
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import MapboxGL from '@rnmapbox/maps';

import MapPreview from "../components/MapPreview";
import GameAreaShape from "../components/GameAreaShape";
import CustomButton from "../components/CustomButton";
import {CARD_STYLE, COLORS} from "../utils/constants";
import {SettingsContext} from "../context/settingsContext";
import useRequestPermission from "../hooks/useRequestPermission";
import CoordinatesView from "../components/CoordinatesView";
import IconButton from "../components/IconButton";
import {getRandomInt} from "../utils/utils";
import {getCoordinatesForPointFromGivenDistance} from "../utils";

function LocationSelect({navigation}) {
    const context = useContext(SettingsContext);
    const requestFineLocationPermission = useRequestPermission();
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        async function askPermissions() {
            const granted = await requestFineLocationPermission();
            if (granted) {
                handleUseMyLocation();
            } else {
                Alert.alert('Fine location permission denied. Please check out the settings menu');
            }
        }

        askPermissions();
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
        if (!context.coordinates) {
            Alert.alert('Select center point first');
            return;
        }
        context.createGameArea(context.distance, context.coordinates, {setOriginalGameArea: true});
    }

    function handleClear() {
        context.handleChangeCoordinates(null);
    }

    function generateGameCoordinateOffset() {
        const data = [];
        let distance = context.distance;
        let width = context.distance;
        for (let i = 0; i < 3; i++) {
            const angle = getRandomInt(-360, 360);
            if (i === 0) {
                distance = Math.round(distance / 4);
            } else {
                distance = Math.round(distance / 2);
            }
            width = width / 2;
            const coordinates = getCoordinatesForPointFromGivenDistance(context.coordinates, distance, angle);
            data.push({
                coordinates,
                distance,
                width,
            });
        }
        return data;
    }

    function postCurrentGame() {
        if (!context.coordinates || !context.gameArea) {
            Alert.alert("Select center point and create game area first");
            return;
        }

        setIsLoading(true);

        const offsetData = generateGameCoordinateOffset();
        context.setOffsetData(offsetData);

        const gameId = Math.floor(100000 + Math.random() * 900000);

        const data = {
            gameId: gameId,
            startTime: JSON.stringify(context.startTime),
            roundTime: context.roundTime,
            distance: context.distance,
            coordinates: context.coordinates,
            offsetData,
        }

        firestore()
            .collection('Games')
            .doc(gameId.toString())
            .set(data)
            .then(() => {
                setIsLoading(false)
                handleStart(gameId);
            })
            .catch((err) => {
                setIsLoading(false);
                Alert.alert(err)
            });
    }

    function temp() {
        context.offsetGameArea(0);

        setTimeout(() => {
            context.offsetGameArea(1);
        }, 2000)

        setTimeout(() => {
            context.offsetGameArea(2);
        }, 4000)
    }

    function handleStart(gameId) {
        navigation.navigate('Prepare', {gameId});
    }

    function handleLongPress(event) {
        const {coordinates} = event.geometry;
        if (coordinates.length === 2) {
            context.handleChangeCoordinates(coordinates, true);
            context.createGameArea(context.distance, context.coordinates, {clear: true});
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapPreview
                    onLongPress={handleLongPress}
                    centerCoordinate={context.coordinates}
                >
                    <MapboxGL.UserLocation/>
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
                <View style={styles.absolute}>
                    <IconButton title="⊹" onPress={handleUseMyLocation}/>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View>
                    <CustomButton title="Create game area" onPress={handlePreviewGameArea}/>
                    <CustomButton title="Clear" onPress={handleClear} color={COLORS.ERROR}/>
                </View>
                <View>
                    <View style={styles.bottomContainer}>
                        <CoordinatesView coordinates={context.coordinates}/>
                    </View>
                    <CustomButton onPress={temp} title={"Temp"}/>
                    <CustomButton isLoading={loading} title="Start" onPress={postCurrentGame} color={COLORS.SUCCESS}/>
                </View>
            </View>
        </View>
    )
}

export default LocationSelect;

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    container: {
        flex: 1,
    },
    map: {
        flex: 3,
    },
    bottomContainer: {
        alignItems: 'center',
    },
    buttonsContainer: {
        flex: 2,
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingTop: 20,
        paddingBottom: 40,
        ...CARD_STYLE,
    }
});