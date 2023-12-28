import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

export function Menu({ distilleries, onSelect, searchTerm, setSearchTerm }) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setKeyboardOffset(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <ScrollView
      style={[styles.menu, { bottom: keyboardOffset ? keyboardOffset + 10 : 70 }]}
    >
      <TextInput
        style={styles.searchBox}
        placeholder="Search distilleries"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {!distilleries.length ? (
        <Text style={styles.fallback}>No distilleries</Text>
      ) : distilleries.map((distillery) => (
        <TouchableOpacity
          key={distillery.id}
          style={styles.menuItem}
          onPress={() => onSelect(distillery)}
        >
          <Text>{distillery.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: 200,
    borderRadius: 10,
    padding: 10,
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  fallback: {
    padding: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
