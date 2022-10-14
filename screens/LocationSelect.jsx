import {View, StyleSheet, Text} from "react-native";
import MapPreview from "../components/MapPreview";
import GameAreaShape from "../components/GameAreaShape";
import CustomButton from "../components/CustomButton";
import {COLORS} from "../utils/constants";

function LocationSelect() {
    function handleUseMyLocation() {
    }

    function handlePreviewGameArea() {
    }

    function handleClear() {
    }

    function handleStart() {}

    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapPreview
                    onLongPress={() => console.log('onLongPress')}
                    centerCoordinate={null}
                >
                    <GameAreaShape coordinates={null}/>
                </MapPreview>
            </View>
            <View style={styles.buttonsContainer}>
                <View>
                    <CustomButton title="Use my location" onPress={handleUseMyLocation}/>
                    <CustomButton title="Preview game area" onPress={handlePreviewGameArea}/>
                    <CustomButton title="Clear" onPress={handleClear} color={COLORS.ERROR}/>
                </View>
                <View>
                    <CustomButton title="Start" onPress={handleStart} color={COLORS.SUCCESS}/>
                    <Text>Selected coordinates:</Text>
                </View>
            </View>
        </View>
    )
}

export default LocationSelect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 3,
    },
    buttonsContainer: {
        flex: 2,
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 20,
    }
});