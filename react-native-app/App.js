import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'your-machine-ip' with your actual local IP address and adjust the endpoint
      const response = await fetch(
        "http://127.0.0.1:8000/api/distilleries/?format=json", 
        {
          mode: "no-cors", // no-cors, *cors, same-origin
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      console.log(response)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
