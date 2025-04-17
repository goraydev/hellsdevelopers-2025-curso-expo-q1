import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useEffect } from "react";
import { getData } from "../boot/_database";

export default function PruebaScreen() {
  async function getLogs() {
    try {
      const data = await getData();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <Screen>
      <Text color="white">TestScreen</Text>
    </Screen>
  );
}
