import { Stack } from "expo-router";

import { createTable, existsFirstOrCreate } from "./_database";

export async function initiDB() {
  await createTable();
  await existsFirstOrCreate();
}

export default function UserLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
