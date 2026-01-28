import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps as RNP,
} from "react-native";
import { ThemedText } from "./themed-text";

export type PressableProps = RNP & {
  onPress: () => void;
  text: string;
};

export default function PressableOption({ onPress, text }: PressableProps) {
  const color = useThemeColor({ light: "#ffffff", dark: "#3f3f3f" }, "text");
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <ThemedText style={{ color }}>{text}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2944df",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  buttonClear: {
    backgroundColor: "#2944df",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
});
