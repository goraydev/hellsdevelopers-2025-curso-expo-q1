import { SQLiteManager } from "expo-sqlite-reactive";

export interface Characters {
  items: Item[];
  meta: Meta;
  links: Links;
}

export interface Item {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  image: string | undefined;
  color: string;
  affiliation: string;
  deletedAt: string | null;
}

export enum Affiliation {
  ArmyOfFrieza = "Army of Frieza",
  Freelancer = "Freelancer",
  ZFighter = "Z Fighter",
}

export enum Gender {
  Female = "Female",
  Male = "Male",
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export const tableName = "allcharacters";

export async function createTable() {
  try {
    await SQLiteManager.createTable(tableName, {
      id: "integer primary key autoincrement",
      name: "text not null",
      ki: "text not null",
      maxKi: "text not null",
      race: "text not null",
      gender: "text not null",
      image: "text",
      color: "text",
      affiliation: "text",
      deletedAt: "text",
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAllItems() {
  try {
    await SQLiteManager.delete(tableName);
  } catch (error) {
    console.error(error);
  }
}

export async function insertCharacter(item: Item) {
  try {
    await SQLiteManager.insert(tableName, item);
    console.log("ITEM character insertado a allcharactes");
  } catch (error) {
    console.error(error);
  }
}

export async function getData() {
  try {
    const result = await SQLiteManager.select(tableName, ["*"]);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default function _database() {
  return null;
}
