import {
  createTable as CreateTableBoot,
  deleteAllItems as DeleteAllItemsBoot,
  insertBootItem,
} from "@/app/boot/_database";
import {
  createTable as CreateTableCharacter,
  deleteAllItems as DeleteAllTableCharacters,
} from "@/app/character/_database";

import { createTable as CreateTableTransformation } from "@/app/transformations/_database";

import { createTable as CreateTableCharacters } from "@/app/characters/_database";
import { SQLiteManager } from "expo-sqlite-reactive";

export async function initializeDB() {
  SQLiteManager.initialize("dragonexpoze.db");
  await CreateTableBoot();
  await DeleteAllItemsBoot();
  await CreateTableCharacter();
  await insertBootItem("table characters created");
  await CreateTableCharacters();
  await insertBootItem("table allcharacters created");
  await CreateTableTransformation();
  await insertBootItem("table transformations created");
  /* await DeleteAllTableCharacters(); */
}
