import { CharacterInfo, CharacterTransformation } from "@/types/characters";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "../Text";
import { stylesCard } from "./styles";

type InfoTransformation = {
  item: CharacterTransformation;
};

export default function CardTransformation({ item }: InfoTransformation) {
  return (
    <View style={stylesCard.card}>
      <Text info>{item.name}</Text>
      <Text color="white">Ki: {item.ki}</Text>
      <Image
        source={{ uri: item.image }}
        style={{ height: 300, width: "100%" }}
        resizeMode="center"
      />
    </View>
  );
}
