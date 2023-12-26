import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

export function Map() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 57.050741,
        longitude: -4.289575,
        latitudeDelta: 6,
        longitudeDelta: 5,
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
