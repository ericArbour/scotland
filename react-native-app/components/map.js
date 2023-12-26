import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

export function Map() {
  return (
    <MapView style={styles.map} initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
