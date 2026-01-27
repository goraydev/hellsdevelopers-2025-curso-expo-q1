import { globalStyles } from "@/styles/global-styles";
import React from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  variante?: "h1" | "h2" | "body";
  children: string;
  color?: string;
}

export default function ThemeText({
  children,
  variante = "h2",
  ...rest
}: Props) {
  return (
    <Text
      {...rest}
      style={[
        { color: "white", fontFamily: "PoppinsRegular" },
        variante && {
          fontSize: variante === "h1" ? 40 : variante === "h2" ? 30 : 10,
        },
        variante === "h1" ? globalStyles.mainResult : globalStyles.subresult,
        ,
        variante === "body" && { color: "white" },
        ,
      ]}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {children}
    </Text>
  );
}
