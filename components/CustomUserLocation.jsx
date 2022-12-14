import {View, Alert} from "react-native";
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import {useEffect, useRef, useState} from "react";

const renderAnnotations = (annotationCoordinate) => {
    if (!annotationCoordinate) return null;
    return (
        <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={annotationCoordinate}
        >
            <View
                style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "blue",
                    borderRadius: 50,
                    borderColor: "#fff",
                    borderWidth: 1,
                }}
            />
        </MapboxGL.PointAnnotation>
    );
};

function CustomUserLocation({ playerCoordinates, setPlayerCoordinates }) {
    const watcherRef = useRef();

    function getCurrentCoordinates() {
        watcherRef.current = Geolocation.watchPosition(
                (position) => {
                    if (position) {
                        const { coords } = position;
                        const { latitude, longitude } = coords;
                        if (latitude && longitude) {
                            setPlayerCoordinates([longitude, latitude]);
                        }
                    }
                },
                (error) => {
                    Alert.alert("Error while getting coordinates: " + error.code, error.message)
                },
                { enableHighAccuracy: true, interval: 1000, distanceFilter: 1, })
    }



    useEffect(() => {
        getCurrentCoordinates()

        return () => {
            Geolocation.clearWatch(watcherRef.current);
        }
    }, [])

    return (
        <View>{renderAnnotations(playerCoordinates)}</View>
    )
}

export default CustomUserLocation;
