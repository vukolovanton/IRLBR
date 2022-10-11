import { View, Text, PermissionsAndroid, Alert, Button } from "react-native";

function Settings() {
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


  return (
    <View>
      <Text>Settings View</Text>

    </View>
  )
}

export default Settings;
