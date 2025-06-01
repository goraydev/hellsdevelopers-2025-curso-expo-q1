import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useStore } from "@/store/storte";

export default function Home() {
  const user = useStore((state) => state.user);

  return (
    <Screen title={`Hola ${user.user_name}`}>
      <Text color="#fff">Home</Text>
    </Screen>
  );
}
