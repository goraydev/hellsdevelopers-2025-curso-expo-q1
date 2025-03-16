import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, ScrollView, FlatList } from "react-native";
import { Text } from "@/components/Text";
import { styles } from "./styles";
import { type CharacterInfo } from "@/types/characters";
import CardTransformation from "@/components/CardTransformation";

export function CharacterInfo({
  description,
  ki,
  maxKi,
  race,
  gender,
  name,
  color,
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

  return (
    <ScrollView style={styles.container}>
      {/* Informacion principal */}
      <View style={styles.container}>
        {/* Description */}
        <View style={localStyles.line}>
          <Text style={localStyles.key} h1>
            Descripción:{" "}
          </Text>
          <Text style={localStyles.value} color="white">
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={localStyles.sectionTitle} h1>
          Habilidades
        </Text>
        {/* Ki */}
        <View style={localStyles.line}>
          <Text style={localStyles.key} color="gold">
            Ki:{" "}
          </Text>
          <Text style={localStyles.value} color="white">
            {ki}
          </Text>
        </View>

        {/* Max Ki */}
        <View style={localStyles.line}>
          <Text style={localStyles.key} color="gold">
            Max Ki:{" "}
          </Text>
          <Text style={localStyles.value} color="white">
            {maxKi}
          </Text>
        </View>

        {/* Race */}
        <View style={localStyles.line}>
          <Text style={localStyles.key} color="gold">
            Race:{" "}
          </Text>
          <Text style={localStyles.value} color="white">
            {race}
          </Text>
        </View>

        {/* Gender */}
        <View style={localStyles.line}>
          <Text style={localStyles.key} color="gold">
            Gender:{" "}
          </Text>
          <Text style={localStyles.value} color="white">
            {gender}
          </Text>
        </View>
      </View>

      {/* Lista de transformaciones */}
      {transformations?.length > 0 && (
        <View>
          <Text style={[localStyles.sectionTitle, { marginTop: 10 }]} h1>
            Transformaciones
          </Text>
          <FlatList
            data={transformations}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[{ paddingHorizontal: 10 }]}
            renderItem={({ item }) => <CardTransformation item={item} />}
            keyExtractor={(item) => `${item.id}`}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            style={{ marginVertical: 20 }}
            key="transformations-list"
            removeClippedSubviews={false} // <- Add This
          />
        </View>
      )}
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  line: {
    marginBottom: 6,
    flexWrap: "wrap",
    flexDirection: "row",
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
    fontSize: 16,
    fontWeight: "bold",
  },
  transformationBox: {
    marginBottom: 15,
  },
  description: {
    marginVertical: 5,
  },
});
