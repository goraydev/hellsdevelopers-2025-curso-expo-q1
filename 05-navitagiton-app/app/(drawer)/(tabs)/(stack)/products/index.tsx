import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import Card from '@/components/shared/Card';
import { products } from '@/store/products.store';

export default function ProductsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Productos',
    });
  }, []);

  return (
    <View className="mx-4 flex flex-1">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card {...item} />}
      />
    </View>
  );
}
