import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { MapComponent } from './components/map-component';
import { Menu } from "./components/menu";

export default function App() {
  const [distilleries, setDistilleries] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [distillerySearchTerm, setDistillerySearchTerm] = useState('');
  const mapRef = useRef(null);
  const mapMarkerMapRef = useRef(new Map());

  useEffect(() => {
    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible((isMenuVisible) => !isMenuVisible);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://miniature-meme-7v9gwp66p9cp446-8000.preview.app.github.dev/api/distilleries/?format=json",
      );
      const json = await response.json();
      setDistilleries(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const filteredDistilleries = distilleries?.filter(distillery =>
    distillery.name.toLowerCase().includes(distillerySearchTerm.toLowerCase())
  ) ?? [];

  const handleDistillerySelect = (distillery) => {
    setIsMenuVisible(false);

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
        <MapComponent
          distilleries={distilleries}
          mapRef={mapRef}
          mapMarkerMapRef={mapMarkerMapRef}
        />
        {isMenuVisible ? (
          <Menu
            distilleries={filteredDistilleries}
            onDistillerySelect={handleDistillerySelect}
            distillerySearchTerm={distillerySearchTerm}
            setDistillerySearchTerm={setDistillerySearchTerm}
          />
        ) : null}
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
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
