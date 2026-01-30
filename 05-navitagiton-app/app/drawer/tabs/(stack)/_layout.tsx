import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="/tabs/(stack)/home"
        options={{
          title: 'Inicio',
        }}
      />
      <Stack.Screen
        name="/tabs/(stack)/products"
        options={{
          title: 'Products Screen',
        }}
      />
      <Stack.Screen
        name="/tabs/(stack)/profile"
        options={{
          title: 'Profile Screen',
        }}
      />
      <Stack.Screen
        name="/tabs/(stack)/settings"
        options={{
          title: 'Settings Screen',
        }}
      />
    </Stack>
  );
}
