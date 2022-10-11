import { View, Text, Button, StyleSheet, Alert } from "react-native";
import MapPreview from "../components/MapPreview";
import Geolocation from 'react-native-geolocation-service';
import { useContext } from "react";
import { SettingsContext } from "../context/settingsContext";

function Map({ navigation }) {
  const context = useContext(SettingsContext);

  function getCurrentCoordinates() {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          const { coords } = position;
          const { latitude, longitude } = coords;
          if (latitude && longitude) {
            context.handleChangeCoordinates([longitude, latitude]);
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
        <MapPreview />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
        <Button title="Use my location" onPress={getCurrentCoordinates} />
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
