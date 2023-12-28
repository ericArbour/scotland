import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export function Menu({ distilleries, onSelect }) {
  if (!distilleries) {
    return null;
  }

  return (
    <ScrollView style={styles.menu}>
      {distilleries.map((distillery) => (
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
    maxHeight: 200,
    borderRadius: 10,
    padding: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
