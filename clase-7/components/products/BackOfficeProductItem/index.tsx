import { Text } from "@/components/share/Text";
import React from "react";
import { View } from "react-native";
import { stylesProductItem } from "./style";
import { TypeProductsTableSchema } from "@/app/backoffice/products/_database";

type Props = {
  product: TypeProductsTableSchema;
};

export default function BackOfficeProductItem({ product }: Props) {
  return (
    <View style={stylesProductItem.container}>
      <Text color="#fff" h1>
        {product.productName}
      </Text>
      <Text color="#fff">s/. {product.productPrice}</Text>
    </View>
  );
}
