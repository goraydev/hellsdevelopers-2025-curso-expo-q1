import {
  createTable as CreateTableBoot,
  deleteAllItems as DeleteAllItemsBoot,
  insertBootItem,
} from "@/app/boot/_database";
import {
  createTable as CreateTableCharacter,
  deleteAllItems as DeleteAllTableCharacters,
} from "@/app/character/_database";
import { SQLiteManager } from "expo-sqlite-reactive";

export async function initializeDB() {
  SQLiteManager.initialize("dragonexpoze.db");
  await CreateTableBoot();
  await DeleteAllItemsBoot();
  await CreateTableCharacter();
  await insertBootItem("table characters created");
  /* await DeleteAllTableCharacters(); */
}
