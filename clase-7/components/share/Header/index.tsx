import React from "react";
import { View, TouchableHighlight } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "@/components/share/Text";

import { styles } from "./styles";

export function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.back}
        onPress={() => (router.canGoBack() ? router.back() : null)}
      >
        {router.canGoBack() ? (
          <AntDesign name="caretleft" size={24} color="white" />
        ) : (
          <></>
        )}
      </TouchableHighlight>
      <Text headerTitle>{title}</Text>
    </View>
  );
}
