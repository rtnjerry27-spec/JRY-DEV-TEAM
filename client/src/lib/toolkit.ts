import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bookmark,
  Box,
  BookOpen,
  Download,
  Gauge,
  ListTree,
  MessageSquareText,
  Palette,
  Plug,
  Volume2,
} from "lucide-react";
import { soundRecords } from "@/data-sounds";

export type ToolDefinition = {
  id: string;
  path: string;
  name: string;
  shortName: string;
  description: string;
  tag: string;
  icon: LucideIcon;
  accent: "emerald" | "aqua" | "violet";
};

export const tools: ToolDefinition[] = [
  {
    id: "color-generator",
    path: "/color-generator",
    name: "RGB & Gradient Generator",
    shortName: "Color Studio",
    description: "Compose exact Minecraft color formats, gradients, and text styles.",
    tag: "Formatting",
    icon: Palette,
    accent: "emerald",
  },
  {
    id: "sound-generator",
    path: "/sound-generator",
    name: "Sound Code Helper",
    shortName: "Sound Library",
    description: "Find official sound keys and copy Bukkit, command, or Skript calls.",
    tag: "Commands",
    icon: Volume2,
    accent: "aqua",
  },
  {
    id: "motd-generator",
    path: "/motd-generator",
    name: "MOTD Generator",
    shortName: "MOTD Studio",
    description: "Design MiniMessage server-list copy with a live game-style preview.",
    tag: "Branding",
    icon: MessageSquareText,
    accent: "violet",
  },
  {
    id: "server-status",
    path: "/server-status",
    name: "Server Status Checker",
    shortName: "Live Status",
    description: "Query a public Minecraft server and inspect its live response.",
    tag: "Live API",
    icon: Activity,
    accent: "emerald",
  },
  {
    id: "tablist-generator",
    path: "/tablist-generator",
    name: "Tablist Config Generator",
    shortName: "Tablist Config",
    description: "Build elegant headers and footers for TAB and BungeeTabListPlus.",
    tag: "Plugin Config",
    icon: ListTree,
    accent: "aqua",
  },
  {
    id: "server-optimizer",
    path: "/server-optimizer",
    name: "Server Optimizer",
    shortName: "Optimizer",
    description: "Tune Paper and Purpur server settings for your player profile.",
    tag: "Performance",
    icon: Gauge,
    accent: "violet",
  },
  {
    id: "downloads",
    path: "/downloads",
    name: "Server Software Downloads",
    shortName: "Downloads",
    description: "Resolve current Paper builds and official software download paths.",
    tag: "Live Builds",
    icon: Download,
    accent: "emerald",
  },
  {
    id: "plugins",
    path: "/plugins",
    name: "Plugin Explorer",
    shortName: "Plugins",
    description: "Discover server plugins from Modrinth and jump to CurseForge results.",
    tag: "Discovery",
    icon: Plug,
    accent: "aqua",
  },
  {
    id: "guides",
    path: "/guides",
    name: "Admin Field Notes",
    shortName: "Field Notes",
    description: "Professional runbooks for launch checks, backups, updates, and incidents.",
    tag: "Operations",
    icon: BookOpen,
    accent: "violet",
  },
  {
    id: "presets",
    path: "/presets",
    name: "Saved Presets",
    shortName: "Saved Presets",
    description: "Persist tool configurations to your private JRY DEV workspace.",
    tag: "Database",
    icon: Bookmark,
    accent: "emerald",
  },
];

export const legacyColors: Record<string, string> = {
  "0": "#000000",
  "1": "#0000AA",
  "2": "#00AA00",
  "3": "#00AAAA",
  "4": "#AA0000",
  "5": "#AA00AA",
  "6": "#FFAA00",
  "7": "#AAAAAA",
  "8": "#555555",
  "9": "#5555FF",
  a: "#55FF55",
  b: "#55FFFF",
  c: "#FF5555",
  d: "#FF55FF",
  e: "#FFFF55",
  f: "#FFFFFF",
};

export const classNames = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export const toBungee = (hex: string) =>
  `&x&${hex.replace("#", "").split("").join("&")}`;

export const toSpigot = (hex: string) => `&${hex}`;

export const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.substring(0, 2), 16),
    g: Number.parseInt(value.substring(2, 4), 16),
    b: Number.parseInt(value.substring(4, 6), 16),
  };
};

export const mixColors = (start: string, end: string, amount: number) => {
  const a = hexToRgb(start);
  const b = hexToRgb(end);
  const toHex = (number: number) => Math.round(number).toString(16).padStart(2, "0");
  return `#${toHex(a.r + (b.r - a.r) * amount)}${toHex(a.g + (b.g - a.g) * amount)}${toHex(a.b + (b.b - a.b) * amount)}`;
};

export const getLegacyStyle = (input: string) => {
  const matches = input.match(/[&§]([0-9a-fk-or])/gi) ?? [];
  let color = "#55FF55";
  const styles = { bold: false, italic: false, underline: false, lineThrough: false, obfuscated: false };
  matches.forEach((entry) => {
    const code = entry.slice(1).toLowerCase();
    if (legacyColors[code]) color = legacyColors[code];
    if (code === "l") styles.bold = true;
    if (code === "o") styles.italic = true;
    if (code === "n") styles.underline = true;
    if (code === "m") styles.lineThrough = true;
    if (code === "k") styles.obfuscated = true;
  });
  return { color, styles };
};

export const stripLegacy = (input: string) => input.replace(/[&§][0-9a-fk-or]/gi, "");
