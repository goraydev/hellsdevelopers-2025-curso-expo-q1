import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Link } from "expo-router";

import { styles } from "./styles";

import { type Character } from "@/types/characters";

type Props = {
  character: Character;
};

export function CharacterContainer({ character }: Props) {
  return (
    <View style={[styles.boxContainer, { backgroundColor: character.color }]}>
      <Link href={`/character/${character.id}/`}>
        <View style={styles.innerContainer}>
          <Text style={styles.boxTitle}>{character.name}</Text>
          <Image
            source={{ uri: character.image }}
            style={styles.tinyLogo}
            resizeMode="contain"
          />
          <Text style={{ color: "#fff" }}>Ki: {character.ki}</Text>
          <Text style={{ color: "#fff" }}>Max Ki: {character.maxKi}</Text>
          <Text style={{ color: "#fff" }}>Race: {character.race}</Text>
          <Text style={{ color: "#fff" }}>Gender: {character.gender}</Text>
          <Text style={{ color: "#fff" }}>
            Affiliation: {character.affiliation}
          </Text>
        </View>
      </Link>
    </View>
  );
}
