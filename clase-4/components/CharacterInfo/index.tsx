import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, ScrollView } from "react-native";
import { Text } from "@/components/Text";
import { styles } from "./styles";
import { type CharacterInfo } from "@/types/characters";
import { FlatList } from "react-native-gesture-handler";
import CardTransformation from "../CardTransformation";

export function CharacterInfo({
  description,
  ki,
  maxKi,
  race,
  gender,
  name,
  transformations,
}: CharacterInfo) {
  // Valor de animación para el efecto "saltando"
  const jumpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia infinita: sube y baja en bucle
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -5, // Ajusta la distancia de "salto"
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [jumpAnim]);

  useEffect(() => {
    console.log(transformations);
  }, [transformations]);

  return (
    <View style={styles.container}>
      {/* Informacion principal */}
      {/* Description */}
      <View style={localStyles.description}>
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Description: </Text>
          <Text style={localStyles.value}>{description}</Text>
        </Text>
      </View>

      {/* Ki */}

      <View style={styles.properties}>
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Ki: </Text>
          <Text style={localStyles.value}>{ki}</Text>
        </Text>

        {/* Max Ki */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Max Ki: </Text>
          <Text style={localStyles.value}>{maxKi}</Text>
        </Text>

        {/* Race */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Race: </Text>
          <Text style={localStyles.value}>{race}</Text>
        </Text>

        {/* Gender */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Gender: </Text>
          <Text style={localStyles.value}>{gender}</Text>
        </Text>
      </View>

      {/* Lista de transformaciones */}
      {transformations?.length > 0 && (
        <View style={styles.stats}>
          <Text h1 style={localStyles.sectionTitle}>
            Transformations
          </Text>
          <FlatList
            data={transformations}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CardTransformation item={item} />}
            keyExtractor={(item) => `${item.id}`}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            style={{ marginVertical: 20 }}
          />
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  line: {
    marginBottom: 6,
    flexWrap: "wrap",
  },
  key: {
    color: "yellow",
    fontWeight: "bold",
  },
  value: {
    color: "white",
  },
  sectionTitle: {
    marginBottom: 10,
    color: "yellow",
  },
  transformationBox: {
    marginBottom: 15,
  },
  description: {
    marginVertical: 5,
  },
});
