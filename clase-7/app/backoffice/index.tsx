import { Link } from "@/components/share/Link";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useStore } from "@/store/storte";
import React from "react";
import { View } from "react-native";

export default function BackOffice() {
  const user = useStore((state) => state.user);
  return (
    <Screen title={`Hola ${user.user_name}`} scroll={false}>
      <Text color="#fff">BackOffice</Text>
      <Link href="/backoffice/products">Productos</Link>
    </Screen>
  );
}
