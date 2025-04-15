import { getColorFromImage } from "@/hooks/useImageColors";
import {
  getDataById,
  insertCharacterItem,
  TypeTableSchema,
} from "@/app/character/_database";

type Props = {
  id: string | string[] | number;
};

export function useCharacterInfo({ id }: Props) {
  // Esta función será usada por TanStack Query
  async function fetchData() {
    try {
      // Verificar si existe en la base de datos
      const cacheData = await getDataById(id);
      if (cacheData) {
        console.log("from database");
        return cacheData;
      }

      console.log("from network");
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      const json = await response.json();

      const color = await getColorFromImage(json.image);
      const character = { ...json, color: color };

      // Guardar en la base de datos
      try {
        await insertCharacterItem({
          id: json.id,
          name: json.name,
          ki: json.ki,
          maxKi: json.maxKi,
          race: json.race,
          gender: json.gender,
          description: json.description,
          image: json.image,
          color: color || "",
          affiliation: json.affiliation || "",
          deletedAt: json.deletedAt || "",
        });
      } catch (error) {
        console.log("Error al guardar en DB, pero continuamos:", error);
      }

      return character;
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  }

  return {
    fetchTansaqQuery: fetchData,
  };
}
