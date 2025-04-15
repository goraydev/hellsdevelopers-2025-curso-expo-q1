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
import { useColorScheme } from "@/hooks/useColorScheme";
import { initializeDB } from "@/db/initialize";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { insertBootItem } from "./boot/_database";
import { deleteAllItems } from "./character/_database";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const SpaceMono = require("@/assets/fonts/SpaceMono-Regular.ttf");

export default function RootLayout() {
  const [initialized, setInitialized] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: SpaceMono,
    Bangers_400Regular,
  });

  useEffect(() => {
    initializeDB().then(() => {
      setInitialized(true);
      insertBootItem("DB initialized");
    });
  }, []);

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="character/[id]/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="prueba/index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
