import {
    PermissionsAndroid,
    Alert,
} from 'react-native';

function useRequestPermission() {
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
            if (!granted === PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Fine location permission denied');
                return false;
            } else {
                return true;
            }
        } catch (err) {
            console.warn(err, '<-- ERR REQUEST');
            return false;
        }
    };

    return requestFineLocationPermission;
}

export default useRequestPermission;