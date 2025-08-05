import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getEntityByUUID, updateEntity } from "../../_database";
import { TextInput } from "@/components/share/TextInput";
import { styles } from "./style";
import { Alert } from "react-native";

export default function ProductItem() {
  const router = useRouter();
  const { id: idProduct } = useLocalSearchParams();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandUUID, setBrandUUID] = useState("");
  const [modelUUID, setModelUUID] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const getProductData = async () => {
    try {
      const productData = await getEntityByUUID(idProduct as string);
      if (!productData) {
        return;
      }
      setProductName(productData.productName);
      setProductDescription(productData.productDescription);
      setBrandUUID(productData.brandUUID);
      setModelUUID(productData.modelUUID);
      setProductPrice(String(productData.productPrice));
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleEditProduct = async () => {
    if (!productName.trim()) {
      Alert.alert("Error", "El nombre del producto es obligatorio");
      return;
    }

    if (!productPrice.trim()) {
      Alert.alert("Error", "El precio del producto es obligatorio");
      return;
    }
    try {
      await updateEntity(idProduct as string, {
        productName,
        productDescription,
        brandUUID,
        modelUUID,
        productPrice: parseFloat(productPrice),
      });

      Alert.alert("Éxito", "El producto fue actualizado exitosamente");
      router.back();
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [idProduct]);

  return (
    <Screen
      title="Editar Producto"
      scroll={false}
      footerAction={() => handleEditProduct()}
      footerText="Actualizar producto"
    >
      <Text variant="label">Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        placeholder="Nombre del Producto"
        defaultValue={productName}
      />
      <Text variant="label">Descripción:</Text>
      <TextInput
        onChangeText={setProductDescription}
        placeholder="Descripción del producto"
        defaultValue={productDescription}
      />
      <Text variant="label">Brand UUID:</Text>
      <TextInput
        onChangeText={setBrandUUID}
        placeholder="Brand UUID"
        defaultValue={brandUUID}
      />

      <Text variant="label">Model UUID:</Text>
      <TextInput
        onChangeText={setModelUUID}
        placeholder="Model UUID"
        defaultValue={modelUUID}
      />

      <Text variant="label">Precio:</Text>
      <TextInput
        onChangeText={setProductPrice}
        inputMode="numeric"
        placeholder="Precio del Producto"
        defaultValue={productPrice}
      />
    </Screen>
  );
}
