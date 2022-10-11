import { View, Text, Button, StyleSheet } from 'react-native';
import react from 'react';

function Card({ children, label, onPress, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.children}>
        {children}
      </View>
      <Button title={title} onPress={onPress} />
    </View>
  )
}

export default react.memo(Card);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 6,
    padding: 12,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  children: {

  },
  button: {

  },
  label: {
    fontWeight: 'bold',
  }
})
