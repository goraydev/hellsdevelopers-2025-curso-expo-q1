import { Stack } from "expo-router";

import { createTable, existsFirstOrCreate } from "./_database";
import React from "react";

export async function initiDB() {
  await createTable();
  await existsFirstOrCreate();
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Stack screenOptions={{ headerShown: false }}>{children}</Stack>;
}
