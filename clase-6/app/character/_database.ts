import { SQLiteManager } from "expo-sqlite-reactive";

export type Character = {
  id?: number;
  name: string;
  ki: string; // Se maneja como string porque viene con puntos y palabras ("60.000.000", "90 Septillion")
  maxKi: string; // Igualmente string
  race: string;
  gender: string;
  description: string;
  image?: string;
  color?: string;
  affiliation?: string;
  deletedAt?: string | null; // o Date | null si en tu lógica quieres manejar un objeto Date
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
    image: "text not null",
    color: "text not null",
    affiliation: "text not null",
    deletedAt: "text not null",
    origenPlanetId: "integer not null",
    origenPlanetName: "text not null",
    origenPlanetIsDestroyed: "integer not null",
    origenPlanetDescription: "text not null",
    origenPlanetImage: "text not null",
    origenPlanetDeletedAt: "text",
    transformationId: "integer not null",
    transformationName: "text not null",
    transformationImage: "text not null",
    transformationKi: "integer not null",
    transformationDeletedAt: "text",
  });
}

export async function deleteAllItems() {
  await SQLiteManager.delete(tableName);
}

export async function insertCharacterItem(character: TypeTableSchema) {
  console.log(character);
  await SQLiteManager.insert(tableName, character);
}

export async function getDataById(characterId: string | string[] | number) {
  const result = await SQLiteManager.select(tableName, ["*"], {
    id: characterId,
  });

  if (result?.length === 0) return null;

  return result?.pop() as TypeTableSchema;
}

export default function _database() {
  return null;
}
