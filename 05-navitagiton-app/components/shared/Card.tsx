import React from 'react';
import { Text, View } from 'react-native';
import Link from '../Link';

interface CardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  link?: boolean;
}

export default function Card({ id, title, description, price, link = true }: CardProps) {
  return (
    <View className="my-4 rounded-xl bg-gray-200 p-4">
      <Text className="font-work-black text-2xl text-primary">{title}</Text>
      <Text>{description}</Text>
      <Text className="text-secondary-100">Precio: {price}</Text>
      {link && (
        <Link href={`drawer/tabs/(stack)/products/${id}`} children="Ver Detalles" className="my-2" />
      )}
    </View>
  );
}
