import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet } from 'react-native';
import barrel from '../assets/barrel.png';
import goldenRetriever from '../assets/golden-retriever.png';

const scotlandInitialRegion = {
  latitude: 57.050741,
  longitude: -4.289575,
  latitudeDelta: 6,
  longitudeDelta: 5,
}

const goldenRetrieverCoordinate = {
  latitude: 57.305787,
  longitude: -4.815355,
}

export function MapComponent({ distilleries, mapRef, mapMarkerMapRef }) {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={scotlandInitialRegion}
      mapType="satellite"
    >
      <Marker
        title="Golden Retriever Ancestral Home"
        coordinate={goldenRetrieverCoordinate}
        zIndex={10}
      >
        <Image
          source={goldenRetriever}
          style={styles.goldenRetrieverMarker}
        />
      </Marker>
      {distilleries ? distilleries.map((distillery) => {
        return (
          <Marker
            ref={ref => mapMarkerMapRef.current.set(distillery.id, ref)}
            key={distillery.id}
            title={distillery.name}
            coordinate={{
              latitude: distillery.latitude,
              longitude: distillery.longitude,
            }}
          >
            <Image
              source={barrel}
              style={styles.distilleryMarker}
            />
          </Marker>);
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
  goldenRetrieverMarker: { width: 80, height: 80 },
  distilleryMarker: { width: 40, height: 40 },
});
