import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Map } from './components/map';

export default function App() {
  const [distilleries, setDistilleries] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://miniature-meme-7v9gwp66p9cp446-8000.app.github.dev/api/distilleries/?format=json",
      );
      const json = await response.json();
      setDistilleries(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Map distilleries={distilleries} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
