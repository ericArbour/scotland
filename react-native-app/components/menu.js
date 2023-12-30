import { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/distilleries-slice';

export function Menu({ onDistillerySelect }) {
  const dispatch = useDispatch();
  const distilleries = useSelector(state => state.distilleries.items);
  const distillerySearchTerm = useSelector(state => state.distilleries.searchTerm);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const filteredDistilleries = distilleries?.filter((distillery) =>
    distillery.name.toLowerCase().includes(distillerySearchTerm.toLowerCase())
  ) ?? [];

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
        value={distillerySearchTerm}
        onChangeText={(text) => dispatch(setSearchTerm(text))}
      />
      {!filteredDistilleries.length ? (
        <Text style={styles.fallback}>No distilleries</Text>
      ) : filteredDistilleries.map((distillery) => (
        <TouchableOpacity
          key={distillery.id}
          style={styles.menuItem}
          onPress={() => onDistillerySelect(distillery)}
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
