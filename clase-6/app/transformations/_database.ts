import { SQLiteManager } from "expo-sqlite-reactive";

export type transformations = {
  id: number;
  characterId: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
};

export const tableName = "transformations";
export async function createTable() {
  await SQLiteManager.createTable(tableName, {
    id: "integer primary key autoincrement",
    characterId: "integer not null",
    name: "text not null",
    image: "text",
    ki: "text not null",
    deletedAt: "text",
  });
}
export async function deleteAllItems() {
  console.log("Table deleted", tableName);
  await SQLiteManager.delete(tableName);
}

export async function insertTransformationItem(
  transformation: transformations
) {
  try {
    await SQLiteManager.insert(tableName, transformation);
    console.log(
      "ITEM transformation insertado a transformations",
      transformation.id
    );
  } catch (error) {
    console.error("Error inserting item:", error);
  }
}

export async function getDataTransformations() {
  try {
    const result = await SQLiteManager.select(tableName, ["*"]);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export async function getDataById(transformationId: number) {
  try {
    const result = await SQLiteManager.select(tableName, ["*"], {
      id: transformationId,
    });
    return result;
  } catch (error) {
    console.error("Error fetching data by ID:", error);
  }
}

export default function _database() {
  return null;
}
