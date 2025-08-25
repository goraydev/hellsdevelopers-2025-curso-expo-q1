import { StyleSheet } from "react-native";

export const stylesProductItem = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },

  styleIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 4,
    padding: 4,
  },
});
