import { useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Alert,
  Button,
} from 'react-native';
import GameReady from '../components/GameReady';
import { SettingsContext } from '../context/settingsContext';
import LocationInput from '../components/LocationInput';

function Settings() {
  const context = useContext(SettingsContext);

  const requestFineLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Settings</Text>
      <LocationInput />
      <GameReady />

      <View style={styles.additional}>
        <Text style={styles.header}>Additional settings</Text>
        <Button
          title="Check permission"
          onPress={requestFineLocationPermission}
        />
      </View>
    </View>
  );
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
});
