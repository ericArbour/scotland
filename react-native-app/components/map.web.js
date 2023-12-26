import React from 'react';
import { Text, FlatList } from "react-native";

export function Map({ distilleries }) {
  if (!distilleries) {
    return <Text>loading...</Text>;
  }

  return (
    <FlatList
      data={distilleries}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
