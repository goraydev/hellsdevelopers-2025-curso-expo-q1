import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 20,
  },
  calculatorContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  mainResult: {
    color: Colors.textPrimary,
    fontSize: 40,
    textAlign: "right",
    fontWeight: "400",
  },
  subresult: {
    color: Colors.textSecondary,
    fontSize: 20,
    textAlign: "right",
  },
  containerLayout: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});
