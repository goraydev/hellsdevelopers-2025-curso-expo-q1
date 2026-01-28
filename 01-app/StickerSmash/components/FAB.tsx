import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Fab() {
  return (
    <Pressable style={styles.fab} onPress={() => console.log("press")}>
      <Text style={styles.fabText}>=</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#2944df",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    position: "absolute",
    bottom: 0,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
  },
});
