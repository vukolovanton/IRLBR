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
        <Text style={getStyle(context.coordinates)}>{context.coordinates && context.coordinates.length > 0 ? context.coordinates.join(', ') : 'unset'}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ready: {
    color: 'green',
  },
  notReady: {
    opacity: 0.4,
  }
})
