import { View, Text, Button, StyleSheet, PermissionsAndroid, Alert, TextInput } from "react-native";
import MapPreview from "../components/MapPreview";
import Geolocation from 'react-native-geolocation-service';
import { useEffect, useState } from "react";

function Map({ navigation }) {
  const [coordinates, setCoordinates] = useState(null);
  const [longitude, setLongtitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const requestFineLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This app needs access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('You can use fine location');
      } else {
        Alert.alert('Fine location permission denied');
      }
    } catch (err) {
      console.warn(err, '<-- ERR REQUEST');
    }
  };

  useEffect(() => {
    const granted = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    if (!granted) {
      requestFineLocationPermission();
    }
  }, [])

  function getCurrentCoordinates() {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          const { coords } = position;
          const { latitude, longitude } = coords;
          if (latitude && longitude) {
            setCoordinates([longitude, latitude])
          }
        }
      },
      (error) => {
        Alert.alert("Error while getting coordinates: " + error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text>Map View</Text>
        <MapPreview centerCoordinate={coordinates} />
      </View>

      <View style={styles.buttonsContainer}>
        {/* <Button title="Settings" onPress={() => navigation.navigate("Settings")} /> */}
        <Button title="Permission" onPress={requestFineLocationPermission} />
        <Button title="Use my location" onPress={getCurrentCoordinates} />
        <TextInput
          style={styles.input}
          placeholder="longitude"
          onChangeText={setLongtitude}
          value={longitude}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={latitude}
          onChangeText={setLatitude}
          placeholder="latitude"
        />
        <Button title="Set location" onPress={() => setCoordinates([longitude, latitude])} />
      </View>
    </View>
  )
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {},
  buttonsContainer: {
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
