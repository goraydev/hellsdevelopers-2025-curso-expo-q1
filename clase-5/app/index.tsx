import { FlatList, View } from "react-native";
import { CharacterContainer } from "@/components/CharacterContainer";
import { Screen } from "@/components/Screen";
import { SearchBox } from "@/components/SearchBox";
import { Text } from "@/components/Text";
import { useCharacters } from "@/api-client/getCharacters";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Character } from "@/types/characters";

export default function Index() {
  const { refreshing, fetchCharacters } = useCharacters();
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text center color="white">
          Cargando...
        </Text>
      </View>
    );
  }

  return (
    <>
      <Screen title="Dragon Expo Z" scroll={false}>
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
          ListFooterComponent={() => (
            <View style={{ height: 120, flex: 1 }}>
              <Text center={true} color="white">
                Total de personajes {filteredTeachers.length}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={{
            flex: 1,
          }}
          numColumns={2}
          keyExtractor={(item) => `${item.id}`}
        />
      </Screen>
      <SearchBox characterFind={searchTerm} setCharacterFind={setSearchTerm} />
    </>
  );
}
