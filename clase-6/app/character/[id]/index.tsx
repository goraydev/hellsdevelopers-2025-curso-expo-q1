import React from "react";

import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/Screen";
import { MainImage } from "@/components/MainImage";
import { CharacterInfo } from "@/components/CharacterInfo";
import { useCharacterInfo } from "@/api-client/getCharacterInfo";
import { Text } from "@/components/Text";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";

export default function Vegeta() {
  const { id } = useLocalSearchParams();

  const { fetchTansaqQuery } = useCharacterInfo({
    id,
  });

  const { data: characterInfo, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: fetchTansaqQuery,
    enabled: !!id,
  });

  if (isLoading || !characterInfo) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text center color="white">
          Cargando...
        </Text>
      </View>
    );
  }

  return (
    <Screen title={`${characterInfo.name}`} color={characterInfo.color}>
      <MainImage uri={characterInfo.image} />
      <CharacterInfo
        id={characterInfo.id}
        description={characterInfo.description}
        ki={characterInfo.ki}
        maxKi={characterInfo.maxKi}
        race={characterInfo.race}
        gender={characterInfo.gender}
        name={characterInfo.name}
        transformations={characterInfo.transformations}
        color={characterInfo.color}
      />
    </Screen>
  );
}
