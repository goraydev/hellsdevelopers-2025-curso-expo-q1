import Link from '@/components/Link';
import CustomButton from '@/components/shared/CustomButton';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();

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
          onPress={() => router.push('/drawer/tabs/products')}
        />
        <CustomButton
          children="Perfil"
          color="secondary"
          variant="text-only"
          onPress={() => router.push('/drawer/tabs/profile')}
        />
        <CustomButton
          children="Ajustes"
          color="tertiary"
          variant="contained"
          onPress={() => router.push('/drawer/tabs/settings')}
        />
      </View>
    </View>
  );
}
