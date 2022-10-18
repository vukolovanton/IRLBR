import {Text, View, StyleSheet} from "react-native";
import useTimer from "../hooks/useTimer";
import {memo} from "react";

function Timer({ time, callback }) {
    const { hours, minutes, seconds } = useTimer(time, callback);

    return (
        <View>
            <Text style={styles.title}>{twoDigits(hours)}:{twoDigits(minutes)}:{twoDigits(seconds)}</Text>
        </View>
    )
}

export default memo(Timer);

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'Audiowide',
    }
})

const twoDigits = (num) => String(num).padStart(2, '0');