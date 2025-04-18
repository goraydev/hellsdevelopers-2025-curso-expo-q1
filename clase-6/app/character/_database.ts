import { SQLiteManager } from "expo-sqlite-reactive";

export type Character = {
  id: number;
  name: string;
  ki: string; // Se maneja como string porque viene con puntos y palabras ("60.000.000", "90 Septillion")
  maxKi: string; // Igualmente string
  race: string;
  gender: string;
  description: string;
  color?: string;
  image?: string;
  affiliation?: string;
  deletedAt?: string;
  transformations?: Transformation[];
};

export type TypeTableSchema = Character & {
  originPlanet?: {
    origenPlanetId: number;
    origenPlanetName: string;
    origenPlanetIsDestroyed: boolean;
    origenPlanetDescription: string;
    origenPlanetImage: string;
    origenPlanetDeletedAt: string | null;
  };
  transformations: Array<{
    id: number;
    name: string;
    image: string;
    ki: string;
    deletedAt: string | null;
  }>;
};

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: null;
}

export const tableName = "characters";

export async function createTable() {
  await SQLiteManager.createTable(tableName, {
    id: "integer primary key autoincrement",
    name: "text not null",
    ki: "text not null",
    maxKi: "text not null",
    race: "text not null",
    gender: "text not null",
    description: "text not null",
    image: "text",
    color: "text",
    affiliation: "text",
    deletedAt: "text",
  });
}

export async function deleteAllItems() {
  console.log("Table deleted", tableName);
  await SQLiteManager.delete(tableName);
}

export async function insertCharacterItem(character: Character) {
  const existing = await getDataById(character.id);

  if (existing) {
    console.log(
      `El personaje ${character.name} ya existe en la DB, saltando inserción`
    );
    return existing;
  }

  console.log("Intentando insertar:", character);
  try {
    await SQLiteManager.insert(tableName, character);
    console.log("Inserción exitosa");
  } catch (error) {
    console.error("Error al insertar:", error);
  }
}

export async function getDataById(characterId: string | string[] | number) {
  const character = await SQLiteManager.select(tableName, ["*"], {
    id: characterId,
  });

  if (character?.length === 0 || !character) return null;

  const result = character[0] as Character;

  const transformations = (await SQLiteManager.select(
    "transformations",
    ["*"],
    {
      characterId: characterId,
    }
  )) as Transformation[];

  result.transformations = transformations || [];
  return result;
}

export default function _database() {
  return null;
}
