import { useEffect, useState } from "react";

import { Character } from "../types/characters";
import { getColorFromImage } from "@/hooks/useImageColors";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchCharacters() {
    try {
      setRefreshing(true);
      const response = await fetch(
        "https://dragonball-api.com/api/characters?limit=60"
      );
      const json = await response.json();

      const charactersPromises = json?.items?.map(async (c: Character) => {
        const color = await getColorFromImage(c.image ?? "");
        return {
          ...c,
          color,
        };
      });

      const characters = await Promise.all(charactersPromises);

      return characters;
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    refreshing,
    fetchCharacters,
  };
}
