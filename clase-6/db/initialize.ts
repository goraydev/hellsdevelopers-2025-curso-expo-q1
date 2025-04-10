import {
  createTable as CreateTableBoot,
  deleteAllItems as DeleteAllItemsBoot,
  insertBootItem,
} from "@/app/boot/_database";
import { createTable as CreateTableCharacter } from "@/app/character/_database";
import { SQLiteManager } from "expo-sqlite-reactive";

export async function initializeDB() {
  SQLiteManager.initialize("dragonexpoze.db");
  await CreateTableBoot();
  await DeleteAllItemsBoot();
  await CreateTableCharacter();
}
