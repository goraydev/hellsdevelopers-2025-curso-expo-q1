import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getEntityByUUID } from "../../_database";
import { TextInput } from "@/components/share/TextInput";
import { styles } from "./style";

export default function ProductItem() {
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

  useEffect(() => {
    getProductData();
  }, [idProduct]);

  return (
    <Screen title="Editar Producto" scroll={false}>
      <Text variant="label">Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        placeholder={productName}
        placeholderTextColor="black"
      />
      <Text variant="label">Descripción:</Text>
      <TextInput
        onChangeText={setProductDescription}
        placeholder={productDescription}
        placeholderTextColor="black"
      />
      <Text variant="label">Brand UUID:</Text>
      <TextInput
        onChangeText={setBrandUUID}
        placeholder={brandUUID}
        placeholderTextColor="black"
      />

      <Text variant="label">Model UUID:</Text>
      <TextInput
        onChangeText={setModelUUID}
        placeholder={modelUUID}
        placeholderTextColor="black"
      />

      <Text variant="label">Precio:</Text>
      <TextInput
        onChangeText={setProductPrice}
        inputMode="numeric"
        placeholder={productPrice}
        placeholderTextColor="black"
      />
    </Screen>
  );
}
