import { useEffect, useState } from "react";
import { type CharacterInfo } from "@/types/characters";
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
  const [characterInfo, setCharacterInfo] = useState<TypeTableSchema>();
  const [refreshing, setRefreshing] = useState(false);

  async function fetchCharacterInfo() {
    try {
      setRefreshing(true);
      const cacheData = await getDataById(id);

      if (cacheData) {
        //console.log('from database');
        setCharacterInfo(cacheData);
        return;
      }

      //console.log('from network');
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      const json = await response.json();

      insertCharacterItem({
        id: json.id,
        name: json.name,
        ki: json.ki,
        maxKi: json.maxKi,
        race: json.race,
        gender: json.gender,
        description: json.description,
        image: json.image,
        originPlanet: {
          origenPlanetId: json.originPlanet.id,
          origenPlanetName: json.originPlanet.name,
          origenPlanetIsDestroyed: json.originPlanet.isDestroyed,
          origenPlanetDescription: json.originPlanet.description,
          origenPlanetImage: json.originPlanet.image,
          origenPlanetDeletedAt: json.originPlanet.deletedAt,
        },
        transformations: json.transformations.map((trans: any) => ({
          id: trans.id,
          name: trans.name,
          image: trans.image,
          ki: trans.ki,
          deletedAt: trans.deletedAt,
        })),
      });

      const color = await getColorFromImage(json.image);
      const character = { ...json, color: color };

      return character;
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchCharacterInfo();
  }, []);

  return {
    characterInfo,
    refreshing,
    fetchCharacterInfo,
  };
}
