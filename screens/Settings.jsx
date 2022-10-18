import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import useRequestPermission from "../hooks/useRequestPermission";
import CustomButton from "../components/CustomButton";

function Settings() {
    const requestFineLocationPermission = useRequestPermission();

    function handleAskLocationPermission() {
        const granted = requestFineLocationPermission();
        if (granted) {
            Alert.alert('Fine location permission granted');
        } else {
            Alert.alert('Fine location permission denied');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.additional}>
                <CustomButton
                    title="Check location permission"
                    onPress={handleAskLocationPermission}
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
