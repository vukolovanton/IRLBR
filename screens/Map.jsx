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

  function checkIfIsInArea() {
    console.log(context.gameArea.geometry.coordinates)
    console.log(context.coordinates)
    console.log('is in area?')
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapPreview />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
        <Button title="Use my location" onPress={getCurrentCoordinates} />
        <Button title="Create game area" onPress={context.createGameArea} />
        <Button title="Check" onPress={checkIfIsInArea} />
        <Text>
          {context.coordinates && context.coordinates.length > 0 ? context.coordinates.join(', ') : 'NO'}
        </Text>
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
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
