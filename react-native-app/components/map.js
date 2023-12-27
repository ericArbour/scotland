import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

export function Map({ distilleries }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 57.050741,
        longitude: -4.289575,
        latitudeDelta: 6,
        longitudeDelta: 5,
      }}
      mapType="satellite"
    >
      {distilleries ? distilleries.map((distillery) => {
          return (
          <Marker
            key={distillery.id}
            coordinate={{
              latitude: distillery.latitude,
              longitude: distillery.longitude,
            }}
            title={distillery.name}
          />);
      }) : null}
    </MapView>
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
