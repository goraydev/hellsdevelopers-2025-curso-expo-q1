import React, { useState } from "react";

import { View } from "react-native";
import { TextInput } from "@/components/share/TextInput";
import { BlurView } from "expo-blur";

interface Props {
  characterFind: string;
  setCharacterFind: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchBox({ characterFind, setCharacterFind }: Props) {
  const [length, setLength] = useState(0);

  return (
    <View
      style={{
        height: 80,
        width: "100%",
        position: "absolute",
        bottom: 0,
      }}
    >
      <BlurView
        intensity={50}
        style={{
          paddingHorizontal: 8,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 0.815)",
          flex: 1,
        }}
      >
        <TextInput
          placeholder="Busca un personaje"
          variant="normal"
          inputMode="search"
          onEndEditing={(v) => setCharacterFind(v)}
          onChangeText={(v) => setLength(v.length)}
          maxLength={30}
        />
      </BlurView>
    </View>
  );
}
