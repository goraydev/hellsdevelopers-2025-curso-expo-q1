import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function IconCreateNew() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/backoffice/products/create");
  };
  return (
    <Ionicons
      name="create-outline"
      size={30}
      color="black"
      style={styles.iconcreate}
      onPress={handleCreate}
    />
  );
}

const styles = StyleSheet.create({
  iconcreate: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    bottom: 10,
    right: 10,
  },
});
