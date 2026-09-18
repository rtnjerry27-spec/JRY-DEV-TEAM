export const minecraftVersions = [
  "26.3",
  "26.2",
  "1.21.11",
  "1.21.4",
  "1.21.1",
  "1.20.6",
  "1.20.4",
  "1.19.4",
  "1.18.2",
  "1.16.5",
  "1.12.2",
  "1.8.8",
] as const;

export type MinecraftVersion = (typeof minecraftVersions)[number];

export const paperApiProjects = ["paper", "folia", "velocity", "waterfall"] as const;

export const isSupportedMinecraftVersion = (value: string): value is MinecraftVersion =>
  minecraftVersions.includes(value as MinecraftVersion);
