import React, { useContext } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import { SettingsContext } from "../context/settingsContext";

function GameReady() {
  const context = useContext(SettingsContext);

  function getStyle(prop) {
    return prop ? styles.ready : styles.notReady
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={getStyle(context.coordinates)}>Location</Text>
        {/* <Text>{context.coordinates ? context.coordinates.join(', ') : ''}</Text> */}
      </View>
    </View>
  )
};

export default React.memo(GameReady);

const styles = StyleSheet.create({
  container: {

  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ready: {
    color: 'green',
  },
  notReady: {
    opacity: 0.4,
  }
})
