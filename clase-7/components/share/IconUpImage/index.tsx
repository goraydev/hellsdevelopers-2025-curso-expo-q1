import { createEmptyItem } from "@/app/backoffice/products/_database";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function IconUpImage() {
  const router = useRouter();

  const handleCreate = async () => {
    router.push("/cameragallery");
  };
  return (
    <Ionicons
      name="camera-outline"
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
