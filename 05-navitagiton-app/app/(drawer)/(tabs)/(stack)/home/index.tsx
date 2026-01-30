import Link from '@/components/Link';
import CustomButton from '@/components/shared/CustomButton';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();

  const onToogleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Inicio',
    });
  }, []);

  return (
    <View>
      <View className=" mx-4 mt-4">
        <CustomButton
          children="Productos"
          color="primary"
          onPress={() => router.push('/products')}
        />
        <CustomButton
          children="Perfil"
          color="secondary"
          variant="text-only"
          onPress={() => router.push('/profile')}
        />
        <CustomButton
          children="Ajustes"
          color="tertiary"
          variant="contained"
          onPress={() => router.push('/settings')}
        />
        <CustomButton
          children="Abrir Menu"
          color="secondary"
          className="mt-5"
          onPress={onToogleDrawer}
        />
      </View>
    </View>
  );
}
