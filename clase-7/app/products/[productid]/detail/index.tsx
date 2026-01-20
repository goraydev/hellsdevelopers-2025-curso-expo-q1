import React, { useEffect, useState } from "react";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useLocalSearchParams } from "expo-router";
import {
  getEntityByUUID,
  TypeImageProductsTableScheme,
} from "@/app/backoffice/products/_database";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { useStore } from "@/store/storte";

export default function ProductsDetail() {
  const { setProductSelected } = useStore();
  const { productid } = useLocalSearchParams();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandUUID, setBrandUUID] = useState("");
  const [modelUUID, setModelUUID] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImages, setProductImages] = useState<
    TypeImageProductsTableScheme[]
  >([]);
  const [productPrice, setProductPrice] = useState("");
  const getProductData = async () => {
    try {
      const productData = await getEntityByUUID(productid as string);
      if (!productData) {
        return;
      }
      /*  const rawImages = productData.productImages.map(
        (item) => item.productImage
      ); */

      setProductName(productData.productName);
      setProductDescription(productData.productDescription);
      setProductImage(productData.productImage || "");
      setBrandUUID(productData.brandUUID);
      setProductImages(productData.productImages || []);
      setModelUUID(productData.modelUUID);
      setProductPrice(String(productData.productPrice));
      setProductSelected(productData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [productid]);

  return (
    <Screen title="Producto" scroll={false}>
      <Text color="white" h1 bold center>
        {productName}
      </Text>
      <Image
        source={{ uri: `data:image/jpeg;base64,${productImage}` }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 10,
          marginHorizontal: "auto",
        }}
      />
      <View style={styles.container}>
        <Text bold>Descripción:</Text>
        <Text>{productDescription}</Text>
      </View>
      <View style={styles.container}>
        <Text bold>Precio:</Text>
        <Text>{productPrice}</Text>
      </View>

      <View>
        <Text bold color="white">
          Galeria de imágenes:
        </Text>
      </View>
      <FlatList
        data={productImages}
        horizontal={true}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 8,
              flex: 1,
              marginHorizontal: 8,
              marginVertical: 8,
            }}
          >
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.productImage}` }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
  },
});
