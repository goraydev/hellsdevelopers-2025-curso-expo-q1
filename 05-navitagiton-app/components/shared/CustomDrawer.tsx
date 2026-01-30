import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View className="mb-4 flex items-center justify-center rounded-xl bg-primary p-4">
        <View className="flex h-36 w-36 items-center justify-center rounded-full bg-white">
          <Text className="p-4 text-center text-4xl font-bold text-black">GA</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
