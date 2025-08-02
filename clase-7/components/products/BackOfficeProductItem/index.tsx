import { Text } from "@/components/share/Text";
import React, { useCallback } from "react";
import { Alert, Button, View } from "react-native";
import { stylesProductItem } from "./style";
import {
  deleteEntity,
  searchItems,
  TypeProductsTableSchema,
} from "@/app/backoffice/products/_database";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";

type Props = {
  product: TypeProductsTableSchema;
};

export default function BackOfficeProductItem({ product }: Props) {
  const handleProductPress = () => {
    //Eliminar el producto
    Alert.alert("¿Seguro de eliminar producto?", "No se podrá revertir", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          console.info("Eliminando producto", product);
          await deleteEntity(product.productUUID);
        },
      },
    ]);
  };

  return (
    <View style={[stylesProductItem.container, { position: "relative" }]}>
      <Ionicons
        style={stylesProductItem.styleIconDelete}
        name="trash"
        size={20}
        color="red"
        onPress={handleProductPress}
      />
      <Text color="#fff">{product.productName}</Text>
      <Text color="#fff">s/. {product.productPrice}</Text>
    </View>
  );
}
