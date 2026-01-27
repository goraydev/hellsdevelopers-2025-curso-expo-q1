import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/theme";

interface Props extends PressableProps {
  children: string;
  color?: "orange" | "darkGray" | "lightGray";
  width?: number;
  onPress: () => void;
}

export default function CalculatorButton({
  children,
  color = "orange",
  width = 60,
  onPress,
  ...rest
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          width: width,
          backgroundColor:
            color === "orange"
              ? Colors.orange
              : color === "darkGray"
                ? Colors.darkGray
                : Colors.lightGray,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      {...rest}
      onPress={() => {
        onPress();
        Haptics.selectionAsync();
      }}
    >
      <Text
        style={{
          color: color === "lightGray" ? "black" : "white",
          fontSize: 20,
          fontFamily: "PoppinsRegular",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    padding: 10,
  },
});
