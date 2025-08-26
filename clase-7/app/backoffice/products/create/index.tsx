// CreateProductScreen.tsx

import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Text } from "@/components/share/Text";
import { Screen } from "@/components/share/Screen";
import { TextInput } from "@/components/share/TextInput";
import {
  insertItem,
  TypeProductsAppSchema,
} from "@/app/backoffice/products/_database";
import { useRouter } from "expo-router";
import { Camera } from "@/components/camera";
import { Link } from "@/components/share/Link";
import { useStore } from "@/store/storte";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraShare } from "@/components/share/CameraShare";

export default function CreateProductScreen() {
  const { base64Data, setBase64Data, galleryBase64Data, setGalleryBase64Data } =
    useStore();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandUUID, setBrandUUID] = useState("");
  const [modelUUID, setModelUUID] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const router = useRouter();

  const handleSaveProduct = async () => {
    console.info("handleSaveProduct");

    if (!productName.trim()) {
      Alert.alert("Error", "El nombre del producto es obligatorio");
      return;
    }

    if (!productPrice.trim()) {
      Alert.alert("Error", "El precio del producto es obligatorio");
      return;
    }

    // Prepara el objeto con los datos que no incluyan 'productUUID'
    const newProductData: TypeProductsAppSchema = {
      productName: productName.trim(),
      productDescription: productDescription.trim(),
      brandUUID: brandUUID.trim(),
      productImage: base64Data,
      productImages: galleryBase64Data,
      modelUUID: modelUUID.trim(),
      productPrice: Number(productPrice.trim()), // conviértelo a número
    };

    try {
      const newUUID = await insertItem(newProductData);
      Alert.alert("Éxito", `Producto creado con UUID: ${newUUID}`);
      setProductName("");
      setProductDescription("");
      setBrandUUID("");
      setBase64Data("");
      setGalleryBase64Data([]);
      setModelUUID("");
      setProductPrice("");
      router.back();
    } catch (error) {
      Alert.alert("Error al crear producto", String(error));
    }
  };

  return (
    <Screen
      title="Crear producto"
      footerAction={() => handleSaveProduct()}
      footerText="Guardar producto"
    >
      <Text variant="label">Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        placeholder="Nombre del producto"
      />

      <Text variant="label">Descripción:</Text>
      <TextInput
        onChangeText={setProductDescription}
        placeholder="Descripción del producto"
      />

      <Text variant="label">Brand UUID:</Text>
      <TextInput onChangeText={setBrandUUID} placeholder="UUID de la marca" />

      <Text variant="label">Model UUID:</Text>
      <TextInput onChangeText={setModelUUID} placeholder="UUID del modelo" />

      <Text variant="label">Precio:</Text>
      <TextInput
        onChangeText={setProductPrice}
        inputMode="numeric"
        placeholder="Precio (numérico)"
      />

      <CameraShare />
      <View
        style={{
          marginBottom: 100,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Ionicons name="camera" size={30} color="white" />
        <Link href="/gallery">
          {galleryBase64Data.length > 0 ? (
            <Text variant="label">Ver galeria de imágenes</Text>
          ) : (
            <Text variant="label">Subir galeria de imágenes</Text>
          )}
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
  },
});
