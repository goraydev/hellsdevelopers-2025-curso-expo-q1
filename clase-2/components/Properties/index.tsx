import React from "react";
import { View } from "react-native";
import { Text } from "@/components/Text";
import { styles } from "./styles";

type Props = {
  description: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  name: string;
};

export function Properties({
  description,
  ki,
  maxKi,
  race,
  gender,
  name,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.properties}>
        <Text h1>{description}</Text>
      </View>
      <View style={styles.stats}>
        <Text info>{ki}</Text>
        <Text info>{maxKi}</Text>
        <Text info>{race}</Text>
        <Text info>{gender}</Text>
      </View>
    </View>
  );
}
