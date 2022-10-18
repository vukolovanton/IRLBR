import {Text, View, StyleSheet} from "react-native";

function CoordinatesView({coordinates}) {
    if (!coordinates || coordinates.length !== 2) return null;
    const reversed = [...coordinates].reverse();
    return (
        <View>
            <Text style={styles.text}>{reversed.join(', ')}</Text>
        </View>
    )
}

export default CoordinatesView;

const styles = StyleSheet.create({
    container: {},
    text: {
        fontSize: 16,
        fontFamily: 'Audiowide',
        color: 'black'
    },
})