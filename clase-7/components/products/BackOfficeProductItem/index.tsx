import { Text } from "@/components/share/Text";
import React, { useCallback } from "react";
import { Alert, Button, Image, View } from "react-native";
import { stylesProductItem } from "./style";
import {
  deleteEntity,
  searchItems,
  TypeProductsTableSchema,
} from "@/app/backoffice/products/_database";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import { MainImage } from "@/components/MainImage";

type Props = {
  product: TypeProductsTableSchema;
};

export default function BackOfficeProductItem({ product }: Props) {
  const router = useRouter();
  const handleDeletePress = () => {
    //Eliminar el producto
    Alert.alert("¿Seguro de eliminar producto?", "No se podrá revertir", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          
          await deleteEntity(product.productUUID);
        },
      },
    ]);
  };

  const handleEditPress = () => {
    router.push(`/backoffice/products/${product.productUUID}/edit`);
  };

  return (
    <View>
      <View style={stylesProductItem.styleIcons}>
        <Ionicons
          name="create-outline"
          size={25}
          color="yellow"
          onPress={handleEditPress}
        />
        <Ionicons
          name="trash"
          size={25}
          color="red"
          onPress={handleDeletePress}
        />
      </View>
      <View style={stylesProductItem.container}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${product.productImage}` }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            objectFit: "contain",
          }}
        />
        <Text color="#fff">{product.productName}</Text>
        <Text color="#fff">s/. {product.productPrice}</Text>
      </View>
    </View>
  );
}
