import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, PermissionsAndroid, Alert, Button, TextInput } from "react-native";
import Card from "../components/Card";
import GameReady from "../components/GameReady";
import { SettingsContext } from '../context/settingsContext';

const coordinatesRegExp = /^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/;

function Settings({ navigation }) {
  const [longitude, setLongtitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const context = useContext(SettingsContext);

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

  function handleSetEnteredLocation() {
    if (!coordinatesRegExp.test(longitude) || !coordinatesRegExp.test(latitude)) {
      Alert.alert("Entered wrong coordinates");
      return;
    }

    context.handleChangeCoordinates([longitude, latitude]);
    setLatitude('');
    setLongtitude('');
  }

  function handleClearLocation() {
    context.handleChangeCoordinates(null);
  }

  useEffect(() => {
    const granted = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    if (!granted) {
      requestFineLocationPermission();
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Settings</Text>
      <Card
        label="Location"
        onPress={handleSetEnteredLocation}
        title="Set Location"
      >
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          onChangeText={setLongtitude}
          value={longitude}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={latitude}
          onChangeText={setLatitude}
          placeholder="Latitude"
        />
        <Button
          title="Clear"
          onPress={handleClearLocation}
        />
      </Card>

      <GameReady />

      <View style={styles.additional}>
        <Text style={styles.header}>Additional settings</Text>
        <Button title="Check permission" onPress={requestFineLocationPermission} />
      </View>
    </View>
  )
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  additional: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
