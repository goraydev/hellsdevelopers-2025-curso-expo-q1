import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlatList, View } from "react-native";
import { CharacterContainer } from "@/components/CharacterContainer";
import { Screen } from "@/components/Screen";
import { SearchBox } from "@/components/SearchBox";
import { Text } from "@/components/Text";

import { useCharacters } from "@/api-client/getCharacters";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Character } from "@/types/characters";

interface UseCharactersReturn {
  refreshing: boolean;
  fetchCharacters: () => Promise<Character[]>;
}

export default function Index() {
  const { refreshing, fetchCharacters }: UseCharactersReturn = useCharacters();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading }: { data?: Character[]; isLoading: boolean } =
    useQuery({
      queryKey: ["characters"],
      queryFn: fetchCharacters,
    });

  const filteredTeachers: Character[] = !isLoading
    ? data?.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? []
    : [];

  return (
    <>
      <Screen title="Dragon Expo Z" scroll={false}>
        {!isLoading && (
          <FlatList
            refreshing={refreshing}
            onRefresh={() => {
              fetchCharacters();
            }}
            data={filteredTeachers}
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
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            style={{
              marginBottom: 100,
            }}
            numColumns={2}
            keyExtractor={(item) => `${item.id}`}
          />
        )}
      </Screen>
      <SearchBox characterFind={searchTerm} setCharacterFind={setSearchTerm} />
    </>
  );
}
