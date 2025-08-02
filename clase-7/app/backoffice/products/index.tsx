import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View } from "react-native";

import {
  searchItems,
  TypeProductsTableSchema,
} from "@/app/backoffice/products/_database";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";

import BackOfficeProductItem from "@/components/products/BackOfficeProductItem";
import IconCreateNew from "@/components/share/IconCreateNew";
import { useFocusEffect } from "expo-router";

export default function BackofficeProductsScreen() {
  const [products, setProducts] = useState<TypeProductsTableSchema[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  async function getProducts() {
    const products = await searchItems();
    setProducts(products);
  }

  /* Primera forma realizada para poder 
  mostrar los productos nuevos */

  useEffect(() => {
    getProducts();
  }, [products]);

  /* Segunda forma, usando el useFocusEffect propio de expo */
  /* useFocusEffect(
    useCallback(() => {
      getProducts();

      console.log("traendo productos nuevos");

      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  ); */

  return (
    <Screen title="Productos" scroll={false}>
      <Text color="#fff">Lista de Productos</Text>
      <FlatList
        data={products}
        numColumns={2}
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
            <BackOfficeProductItem product={item} />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await getProducts();
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
