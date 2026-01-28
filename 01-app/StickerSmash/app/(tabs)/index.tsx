import { Image } from "expo-image";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import PressableOption from "@/components/PressableOption";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import Operations from "../helpers/operations";

export default function HomeScreen() {
  const [firstNumber, setfirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const color = useThemeColor({ light: "#ffffff", dark: "#3f3f3f" }, "text");

  const { handlePlus, handleRest, handleMultiply, handleDivide } = Operations(
    firstNumber,
    secondNumber,
  );

  const executeOperation = (
    operationFn: (a: string, b: string) => number | string,
  ) => {
    const res = operationFn(firstNumber, secondNumber);
    Alert.alert("El resultado es", res.toString());
  };

  const handleClear = () => {
    setfirstNumber("0");
    setSecondNumber("0");
  };

  return (
    <View style={styles.container}>
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
            style={[styles.input, { backgroundColor: color }]}
          />
          <TextInput
            onChangeText={setSecondNumber}
            value={secondNumber}
            keyboardType="numeric"
            style={[styles.input, { backgroundColor: color }]}
          />
        </ThemedView>
        <ThemedView>
          <ThemedText type="subtitle">Operaciones</ThemedText>
        </ThemedView>
        <ThemedView style={styles.operationsButtons}>
          <PressableOption
            onPress={() => executeOperation(handlePlus)}
            text="+"
          />
          <PressableOption
            onPress={() => executeOperation(handleRest)}
            text="-"
          />
          <PressableOption
            onPress={() => executeOperation(handleMultiply)}
            text="x"
          />
          <PressableOption
            onPress={() => executeOperation(handleDivide)}
            text="/"
          />
          <PressableOption onPress={handleClear} text="C" />
        </ThemedView>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
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
  operationsButtons: {
    flexDirection: "row",
    gap: 2,
  },
});
