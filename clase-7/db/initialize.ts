import { createTable as CreateTableProducts } from "@/app/products/_database";
import { SQLiteManager } from "expo-sqlite-reactive";

export async function initializeDB() {
  SQLiteManager.initialize("ecommerceapp.db");
  await CreateTableProducts();
}
