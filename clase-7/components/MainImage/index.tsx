import React from "react";
import { Image, View, useWindowDimensions } from "react-native";

import { styles } from "./styles";

type Props = {
  uri: string | undefined;
};

export function MainImage({ uri }: Props) {
  const { height } = useWindowDimensions();
  return (
    <View>
      <Image
        source={{ uri }}
        style={[styles.image, { height: height * 0.8 }]}
        resizeMode="contain"
      />
    </View>
  );
}

