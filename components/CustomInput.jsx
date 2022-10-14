import {View, Text, StyleSheet, TextInput} from "react-native";
import {COMMON_STYLES} from "../utils/constants";

function CustomInput({ label, onChangeText, value, placeholder = '', keyboardType = 'numeric' }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 12,
        color: 'black',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: COMMON_STYLES.BORDER_RADIUS,
    }
})