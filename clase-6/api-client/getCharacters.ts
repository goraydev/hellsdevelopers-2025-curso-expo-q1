import { Character } from "../types/characters";
import { getColorFromImage } from "@/hooks/useImageColors";
import { getData, insertCharacter } from "@/app/characters/_database";

export function useCharacters() {
  async function fetchData() {
    try {
      const cacheData = await getData();

      if (cacheData && cacheData.length > 0) {
        console.log("from allcharacters database");
        return cacheData;
      }
      console.log("from network");
      const response = await fetch(
        "https://dragonball-api.com/api/characters?limit=60"
      );
      const json = await response.json();

      const charactersPromises = json?.items?.map(async (c: Character) => {
        const color = await getColorFromImage(c.image ?? "");

        if (c.id === undefined) return;

        try {
          await insertCharacter({
            id: c.id,
            name: c.name,
            ki: c.ki,
            maxKi: c.maxKi,
            race: c.race,
            gender: c.gender,
            image: c.image,
            color: color || "",
            affiliation: c.affiliation || "",
            deletedAt: c.deletedAt || null,
          });
        } catch (error) {
          console.error("ERROR AL GUARDAR EN DB", error);
        }
        return {
          ...c,
          color,
        };
      });

      const characters = await Promise.all(charactersPromises);
      

      return characters;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    fetchTansaqQuery: fetchData,
  };
}
