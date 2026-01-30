import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from '@expo/vector-icons';
import CustomDrawer from '@/components/shared/CustomDrawer';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerActiveTintColor: 'purple',
      }}>
      <Drawer.Screen
        name="tabs"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ color, size }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="user/index"
        options={{
          drawerLabel: 'User',
          title: 'User',
          drawerIcon: ({ color, size }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="schedules/index"
        options={{
          drawerLabel: 'Schedules',
          title: 'Schedules',
          drawerIcon: ({ color, size }) => <FontAwesome name="calendar" size={24} color={color} />,
        }}
      />
    </Drawer>
  );
}
