import { View, Text, Button, StyleSheet, PermissionsAndroid } from "react-native";
import MapPreview from "../components/MapPreview";
import Geolocation from 'react-native-geolocation-service';
import { useEffect } from "react";

function Map({ navigation }) {
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
        console.log("You can use fine location");
      } else {
        console.log("Fine location permission denied");
      }
    } catch (err) {
      console.warn(err, '<-- ERR REQUEST');
    }
  };

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position);
  //     },
  //     (error) => {
  //       // See error code charts below.
  //       console.log(error.code, error.message, '<____ USE EFFECT');
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  // }, [])

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text>Map View</Text>
        <MapPreview />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
        <Button title="Permission" onPress={requestFineLocationPermission} />
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
})
