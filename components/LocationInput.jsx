import { Button, TextInput, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";
import Card from './Card';
import { SettingsContext } from "../context/settingsContext";

const coordinatesRegExp = /^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/;

function LocationInput() {
  const context = useContext(SettingsContext);
  const [longitude, setLongtitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

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

  return (
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
        color={'red'}
        onPress={handleClearLocation}
      />
    </Card>
  )
};

export default LocationInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
