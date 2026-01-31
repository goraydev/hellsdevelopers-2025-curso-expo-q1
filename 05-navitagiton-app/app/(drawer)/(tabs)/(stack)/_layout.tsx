import { FontAwesome } from '@expo/vector-icons';
import { DrawerActions, StackActions } from '@react-navigation/native';
import { router, Stack, useNavigation } from 'expo-router';

export default function StackLayout() {
  const navigation = useNavigation();
  const onHeaderLeftClick = (canGoBack: boolean) => {
    if (canGoBack) {
      router.back();
      return;
    }
    navigation.dispatch(DrawerActions.toggleDrawer);
  };

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
        headerLeft: ({ tintColor, canGoBack = true }) => (
          <FontAwesome
            name={canGoBack ? 'arrow-left' : 'bars'}
            size={24}
            color="#000"
            onPress={() => onHeaderLeftClick(canGoBack)}
            className="mr-4"
          />
        ),
      }}>
      <Stack.Screen
        name="/tabs/(stack)/home"
        options={{
          title: 'Inicio',
          headerShown: false,
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
