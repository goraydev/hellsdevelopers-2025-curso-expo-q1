import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { Header } from "@/components/Header";

import { styles } from "./styles";

type Props = {
  children: React.ReactNode;
  title?: string;
  scroll?: boolean;
  color?: string;
};

export function Screen({ children, title, scroll = true, color }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        {title ? <Header title={title} /> : null}
        {scroll ? (
          <ScrollView
            style={[styles.scrollView, { backgroundColor: color }]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
