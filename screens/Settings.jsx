import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import useRequestPermission from "../hooks/useRequestPermission";

function Settings() {
  const requestFineLocationPermission = useRequestPermission();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Settings</Text>
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
