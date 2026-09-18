import { describe, expect, it } from "vitest";
import { isSupportedMinecraftVersion, minecraftVersions, paperApiProjects } from "../shared/downloads";

describe("download catalog", () => {
  it("keeps current and legacy Minecraft versions available", () => {
    expect(minecraftVersions[0]).toBe("26.3");
    expect(minecraftVersions).toContain("1.8.8");
    expect(isSupportedMinecraftVersion("1.20.4")).toBe(true);
    expect(isSupportedMinecraftVersion("not-a-version")).toBe(false);
  });

  it("tracks the PaperMC projects resolved by the live API", () => {
    expect(paperApiProjects).toEqual(["paper", "folia", "velocity", "waterfall"]);
  });
});
