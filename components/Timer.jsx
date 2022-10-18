import {Text, View, StyleSheet} from "react-native";
import useTimer from "../hooks/useTimer";
import {memo} from "react";
import {COLORS} from "../utils/constants";

function Timer({ time, callback, light = false }) {
    const { hours, minutes, seconds } = useTimer(time, callback);

    return (
        <View>
            <Text style={styles(light).title}>{twoDigits(hours)}:{twoDigits(minutes)}:{twoDigits(seconds)}</Text>
        </View>
    )
}

export default memo(Timer);

const styles = (light) => StyleSheet.create({
    title: {
        color: light ? COLORS.LIGHT : COLORS.MAIN,
        fontFamily: 'Audiowide',
    }
})

const twoDigits = (num) => String(num).padStart(2, '0');