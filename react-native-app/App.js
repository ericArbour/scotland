import { StatusBar } from "expo-status-bar";
import { StyleSheet, Pressable, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Map } from './components/map';
import { Menu } from "./components/menu";

export default function App() {
  const [distilleries, setDistilleries] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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

  return (
    <View>
      <Map distilleries={distilleries} />
      {isMenuVisible ? <Menu distilleries={distilleries} onSelect={() => {}} /> : null}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.text}>☰</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
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
