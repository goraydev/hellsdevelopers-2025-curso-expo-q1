import { Image } from "expo-image";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";

export default function HomeScreen() {
  const [firstNumber, setfirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");

  const handlePlus = () => {
    return Alert.alert(
      "Resultado",
      `${Number(firstNumber) + Number(secondNumber)}`,
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={[styles.titleContainer]}>
        <ThemedText type="title" style={{ paddingBottom: 16 }}>
          Welcome Gerson Aguedo!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pequeña calculadora</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          onChangeText={setfirstNumber}
          value={firstNumber}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          onChangeText={setSecondNumber}
          value={secondNumber}
          keyboardType="numeric"
          style={styles.input}
        />
      </ThemedView>
      <Pressable style={styles.button} onPress={handlePlus}>
        <ThemedText type="default" lightColor="#FFFFFF" darkColor="#000000">
          Sumar
        </ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    position: "absolute",
    bottom: 0,
    width: 100,
    height: 100,
  },

  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 4,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2944df",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
