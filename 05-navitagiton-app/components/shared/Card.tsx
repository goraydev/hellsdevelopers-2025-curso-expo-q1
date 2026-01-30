import React from 'react';
import { Image, Text, View } from 'react-native';
import Link from '../Link';

interface CardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  link?: boolean;
}

export default function Card({ id, title, description, price, link = true, image }: CardProps) {
  return (
    <View className="my-4 rounded-xl bg-gray-200 p-4">
      <Text className="font-work-black text-2xl text-primary">{title}</Text>
      {image && <Image source={{ uri: image }} className="h-56 w-full rounded-xl object-contain" />}
      <Text>{description}</Text>
      <Text className="text-secondary-100">Precio: {price}</Text>
      {link && <Link href={`/products/${id}`} children="Ver Detalles" className="my-2" />}
    </View>
  );
}
