import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Bangers_400Regular, useFonts } from "@expo-google-fonts/bangers";
import { initializeDB } from "@/db/initialize";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const SpaceMono = require("@/assets/fonts/SpaceMono-Regular.ttf");

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  if (!loaded || !initDB) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="users" options={{ headerShown: false }} />
          <Stack.Screen name="users/login/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
