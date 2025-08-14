import { useStore } from "@/store/storte";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "../Text";

interface CameraShareProps {
  currentBase64?: string; // El ? hace que sea opcional
}

export const CameraShare = ({ currentBase64 = "" }: CameraShareProps) => {
  const { base64Data } = useStore();

  return (
    <>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Ionicons name="camera" size={30} color="white" />
        <Link href="/camera">
          {base64Data === "" && currentBase64 === "" ? (
            <Text variant="label">Subir Imagen de Producto</Text>
          ) : (
            <Text variant="label">Actualizar Imagen de Producto</Text>
          )}
        </Link>
      </View>

      <View
        style={{
          marginVertical: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {base64Data != "" && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${base64Data}` }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
        {base64Data === "" && currentBase64 && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${currentBase64}` }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
      </View>
    </>
  );
};
