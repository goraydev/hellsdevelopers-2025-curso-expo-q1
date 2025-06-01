import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useStore } from "@/store/storte";
import React from "react";

export default function BackOffice() {
  const user = useStore((state) => state.user);
  return (
    <Screen title={`Hola ${user.user_name}`}>
      <Text color="#fff">BackOffice</Text>
    </Screen>
  );
}
