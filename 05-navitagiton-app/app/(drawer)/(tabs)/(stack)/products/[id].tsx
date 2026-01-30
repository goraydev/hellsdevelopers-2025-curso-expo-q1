import Card from '@/components/shared/Card';
import { products } from '@/store/products.store';
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function ItemProductScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const product = products.find((p) => p.id === id);
  if (!product) return <Redirect href="/" />;

  useEffect(() => {
    navigation.setOptions({
      title: product.title,
    });
  }, [navigation, product]);

  return (
    <View className="mx-4">
      <Card {...product} link={false} />
    </View>
  );
}
