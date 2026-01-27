import CalculatorButton from "@/components/CalculatorButton";
import ThemeText from "@/components/ThemeText";
import { useCalculator } from "@/hooks/useCalculator";
import { globalStyles } from "@/styles/global-styles";
import React from "react";
import { View } from "react-native";

export default function CalculatorApp() {
  const {
    formula,
    prevNumber,
    buildNumber,
    number,
    clearButton,
    delButton,
    toogleSign,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateResult,
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={globalStyles.containerLayout}>
        <ThemeText variante="h1">{formula}</ThemeText>
        <ThemeText variante="h2">
          {formula === prevNumber ? "" : prevNumber}
        </ThemeText>
      </View>

      {/* Los botones  */}
      <View style={globalStyles.row}>
        <CalculatorButton color="lightGray" onPress={() => clearButton()}>
          C
        </CalculatorButton>
        <CalculatorButton color="lightGray" onPress={() => toogleSign()}>
          +/-
        </CalculatorButton>
        <CalculatorButton color="lightGray" onPress={() => delButton()}>
          del
        </CalculatorButton>
        <CalculatorButton onPress={() => divideOperation()}>/</CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("7")}>
          7
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("8")}>
          8
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("9")}>
          9
        </CalculatorButton>
        <CalculatorButton onPress={() => multiplyOperation()}>
          x
        </CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("4")}>
          4
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("5")}>
          5
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("6")}>
          6
        </CalculatorButton>
        <CalculatorButton onPress={() => substractOperation()}>
          -
        </CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("1")}>
          1
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("2")}>
          2
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("3")}>
          3
        </CalculatorButton>
        <CalculatorButton onPress={() => addOperation()}>+</CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton color="darkGray" onPress={() => buildNumber("0")}>
          0
        </CalculatorButton>
        <CalculatorButton color="darkGray" onPress={() => buildNumber(".")}>
          .
        </CalculatorButton>
        <CalculatorButton width={160} onPress={() => calculateResult()}>
          =
        </CalculatorButton>
      </View>
    </View>
  );
}
