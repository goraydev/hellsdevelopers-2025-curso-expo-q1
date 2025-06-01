import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useRoute,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Bangers_400Regular, useFonts } from "@expo-google-fonts/bangers";
import { initializeDB } from "@/db/initialize";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getData } from "@/db/localStorage";
import parserData from "@/helpers/parserData";
import { useStore } from "@/store/storte";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const SpaceMono = require("@/assets/fonts/SpaceMono-Regular.ttf");

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const setState = useStore((state) => state.setState);

  const [initDB, setInitDB] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: SpaceMono,
    Bangers_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      //Inicializar la BD
      initializeDB().then(() => setInitDB(true));
    }
  }, [loaded]);

  const queryClient = new QueryClient();

  useEffect(() => {
    if (initDB) {
      getData("user")
        .then((user) => {
          if (user) {
            const getData = parserData(user);

            setState(getData);

            if (getData.user_level === 1) {
              router.push("/backoffice");
              return;
            }
            router.push("/home");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [initDB]);

  if (!loaded || !initDB) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="users/index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="signup/index" />
          <Stack.Screen name="home/index" />
          <Stack.Screen name="backoffice/index" />
          <Stack.Screen name="products/index" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
