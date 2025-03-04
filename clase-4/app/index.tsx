import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlatList, View } from "react-native";
import { CharacterContainer } from "@/components/CharacterContainer";
import { Screen } from "@/components/Screen";
import { SearchBox } from "@/components/SearchBox";
import { Text } from "@/components/Text";

import { useCharacters } from "@/api-client/getCharacters";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { refreshing, fetchCharacters } = useCharacters();

  const { data, isLoading } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  return (
    <>
      <Screen title="Dragon Expo Z" scroll={false}>
        {!isLoading && (
          <FlatList
            refreshing={refreshing}
            onRefresh={() => {
              fetchCharacters();
            }}
            data={data}
            renderItem={({ item }) => (
              <CharacterContainer key={item.id} character={item} />
            )}
            ListEmptyComponent={() => (
              <Text center red>
                No hay elementos
              </Text>
            )}
            ListHeaderComponent={() => (
              <Text center color="#fff">
                Personajes
              </Text>
            )}
            ListFooterComponent={() => (
              <Text
                center
                color="#fff"
              >{`Total de personajes: ${data.length}`}</Text>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            style={{
              marginBottom: 100,
            }}
            numColumns={2}
            keyExtractor={(item) => `${item.id}`}
          />
        )}
      </Screen>
      <SearchBox />
    </>
  );
}
