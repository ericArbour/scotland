import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MapComponent } from './components/map-component';
import { Menu } from "./components/menu";
import { fetchDistilleries, toggleMenu } from "./store/distilleries-slice";
import { store } from './store/store';

function App() {
  const dispatch = useDispatch();
  const distilleriesStatus = useSelector(state => state.distilleries.status);
  const isMenuVisible = useSelector(state => state.distilleries.isMenuVisible);
  const mapRef = useRef(null);
  const mapMarkerMapRef = useRef(new Map());

  useEffect(() => {
    if (distilleriesStatus === 'idle') {
      dispatch(fetchDistilleries())
    }
  }, [distilleriesStatus, dispatch])

  const handleDistillerySelect = (distillery) => {
    dispatch(toggleMenu());

    const newRegion = {
      latitude: distillery.latitude,
      longitude: distillery.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);

    const selectedMarkerRef = mapMarkerMapRef.current.get(distillery.id);
    if (selectedMarkerRef) {
      selectedMarkerRef.showCallout();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <MapComponent mapRef={mapRef} mapMarkerMapRef={mapMarkerMapRef} />
        {isMenuVisible ? (
          <Menu onDistillerySelect={handleDistillerySelect} />
        ) : null}
        <TouchableOpacity style={styles.menuButton} onPress={() => dispatch(toggleMenu())}>
          <Text style={styles.text}>☰</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 100,
  },
  text: {
    fontSize: 70,
    color: 'rgba(255, 255, 255, 0.9)',
  }
});

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
