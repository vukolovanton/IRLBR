import {Text, View, StyleSheet} from "react-native";
import {memo} from "react";

function GameIdView({gameId}) {
    function getUserFacingValue() {
        if (gameId.toString().length !== 6) return gameId;

        const start = gameId.toString().slice(0, 3);
        const end = gameId.toLocaleString().slice(-3);

        return `${start}-${end}`;
    }

    return (
        <View>
            <Text style={styles.title}>{getUserFacingValue()}</Text>
        </View>
    )
}

export default memo(GameIdView);

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Audiowide',
    }
})