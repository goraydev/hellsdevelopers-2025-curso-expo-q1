import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import {
  searchItems,
  TypeProductsTableSchema,
} from "@/app/backoffice/products/_database";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { Link } from "@/components/share/Link";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BackofficeProductsScreen() {
  const [products, setProducts] = useState<TypeProductsTableSchema[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  async function getProducts() {
    const products = await searchItems();
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleCreate = () => {
    router.push("/backoffice/products/create");
  };

  return (
    <Screen title="Productos" scroll={false}>
      <Text color="#fff">Lista de Productos</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <Text>{item.productName}</Text>}
        ListEmptyComponent={() => (
          <Text center color="#fff">
            No hay productos
          </Text>
        )}
      />
      <Ionicons
        name="create-outline"
        size={30}
        color="black"
        style={styles.iconcreate}
        onPress={handleCreate}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  iconcreate: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    bottom: 10,
    right: 10,
  },
});
