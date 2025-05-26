import {
  createTable as CreateTableProducts,
  deleteAllItems,
} from "@/app/products/_database";
import { SQLiteManager } from "expo-sqlite-reactive";
import { initiDB as initUserData } from "../app/users/_layout";

export async function initializeDB() {
  SQLiteManager.initialize("ecommerceapp.db");
  await initUserData();
}
