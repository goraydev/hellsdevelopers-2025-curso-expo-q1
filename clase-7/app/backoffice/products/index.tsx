import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import {
  searchItems,
  TypeProductsTableSchema,
} from "@/app/backoffice/products/_database";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";

import BackOfficeProductItem from "@/components/products/BackOfficeProductItem";
import IconCreateNew from "@/components/share/IconCreateNew";

export default function BackofficeProductsScreen() {
  const [products, setProducts] = useState<TypeProductsTableSchema[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  async function getProducts() {
    const products = await searchItems();
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <Screen title="Productos" scroll={false}>
      <Text color="#fff">Lista de Productos</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <BackOfficeProductItem product={item} />}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getProducts();
          setRefreshing(false);
        }}
        ListEmptyComponent={() => (
          <Text center color="#fff">
            No hay productos
          </Text>
        )}
      />
      <IconCreateNew />
    </Screen>
  );
}
