import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Boxes, CheckCircle2, Download, ExternalLink, Filter, Github, Globe2, Search, ShieldCheck, Sparkles, Star, Terminal, Wrench } from "lucide-react";
import { AppShell, AccentTag, CodeBlock, PageIntro, SectionCard, copyText } from "@/components/AppShell";
import { classNames } from "@/lib/toolkit";

const inputClass = "h-10 w-full rounded-lg border border-white/[0.09] bg-black/20 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-300/45 focus:ring-2 focus:ring-emerald-300/10";

type ModrinthProject = { project_id: string; title: string; description: string; author: string; downloads: number; follows: number; icon_url: string; slug?: string; project_type: string; categories: string[]; latest_version: string };

const fallbackPlugins: ModrinthProject[] = [
  { project_id: "essentialsx", title: "EssentialsX", description: "The essential plugin suite for Minecraft servers.", author: "EssentialsX Team", downloads: 0, follows: 0, icon_url: "", slug: "essentialsx", project_type: "plugin", categories: ["bukkit"], latest_version: "" },
  { project_id: "luckperms", title: "LuckPerms", description: "An advanced permissions implementation for Bukkit and other platforms.", author: "Luck", downloads: 0, follows: 0, icon_url: "", slug: "luckperms", project_type: "plugin", categories: ["bukkit"], latest_version: "" },
  { project_id: "viaversion", title: "ViaVersion", description: "Allow servers to accept connections from newer Minecraft versions.", author: "ViaVersion", downloads: 0, follows: 0, icon_url: "", slug: "viaversion", project_type: "plugin", categories: ["bukkit"], latest_version: "" },
];

export function PluginsPage() {
  const [query, setQuery] = useState("plugin");
  const [loader, setLoader] = useState("plugin");
  const [sort, setSort] = useState("relevance");
  const [projects, setProjects] = useState<ModrinthProject[]>(fallbackPlugins);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("Showing starter picks. Search Modrinth for live results.");
  const downloadProject = async (project: ModrinthProject) => { try { const response = await fetch(`https://api.modrinth.com/v2/project/${project.project_id}/version`); const versions = await response.json() as Array<{ files: Array<{ url: string; primary?: boolean }> }>; const file = versions[0]?.files?.find((candidate) => candidate.primary) || versions[0]?.files?.[0]; if (file?.url) window.open(file.url, "_blank", "noopener,noreferrer"); } catch { window.open(`https://modrinth.com/${project.project_type}/${project.slug || project.project_id}`, "_blank", "noopener,noreferrer"); } };
  const search = async () => {
    setLoading(true);
    try {
      const facets = JSON.stringify([[`all_project_types:${loader}`]]);
      const url = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query || "server")}&facets=${encodeURIComponent(facets)}&index=${sort}&limit=18`;
      const response = await fetch(url, { headers: { "User-Agent": "JRY-DEV/1.0 (https://jry.dev)" } });
      if (!response.ok) throw new Error("Modrinth unavailable");
      const data = await response.json() as { hits: ModrinthProject[]; total_hits: number };
      setProjects(data.hits);
      setNotice(`${data.total_hits.toLocaleString()} Modrinth projects matched your search.`);
    } catch {
      setNotice("Modrinth could not be reached from this browser. Starter picks remain available, plus the CurseForge search link below.");
    } finally { setLoading(false); }
  };
  useEffect(() => { void search(); }, []);
  return <AppShell><PageIntro eyebrow="PLUGIN DISCOVERY" title="Plugin Explorer" description="Search Modrinth projects in a focused, server-admin workflow. CurseForge stays one click away for its broader catalog."><AccentTag color="aqua"><Globe2 className="mr-1 size-3" /> Plugins Live Find</AccentTag></PageIntro>
    <SectionCard title="Find the right plugin" description="Search by capability, author, or project name. Results are loaded from Modrinth’s public API."><div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:p-6"><div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-600" /><input className={`${inputClass} pl-9`} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && search()} placeholder="e.g. permissions, claims, performance" /></div><select className={inputClass + " sm:w-32"} value={loader} onChange={(event) => setLoader(event.target.value)}><option value="plugin">Plugins</option><option value="mod">Mods</option><option value="datapack">Datapacks</option></select><select className={inputClass + " sm:w-32"} value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">Relevance</option><option value="downloads">Downloads</option><option value="newest">Newest</option></select><button onClick={search} disabled={loading} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-300 px-4 text-sm font-bold text-[#07100e] transition hover:bg-emerald-200 disabled:opacity-60"><Filter className="size-4" /> {loading ? "Searching…" : "Search"}</button></div></SectionCard>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">{notice}</p><a href={`https://www.curseforge.com/minecraft/search?class=bukkit-plugins&page=1&pageSize=20&sortBy=relevancy&search=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-orange-300/20 bg-orange-300/[.06] px-3 py-2 text-xs font-semibold text-orange-200 transition hover:bg-orange-300/10"><ExternalLink className="size-3.5" /> Search CurseForge</a></div>
    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <article key={project.project_id} className="group flex min-h-[230px] flex-col rounded-2xl border border-white/[.08] bg-[#10141c] p-5 transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-[#121822]"><div className="flex items-start gap-3"><div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-cyan-300/15 bg-cyan-300/[.07]">{project.icon_url ? <img src={project.icon_url} alt="" className="size-full object-cover" /> : <Boxes className="size-5 text-cyan-200" />}</div><div className="min-w-0 flex-1"><h2 className="truncate text-base font-bold text-white">{project.title}</h2><p className="mt-0.5 truncate text-xs text-slate-600">by {project.author}</p></div><span className="rounded-md border border-white/[.08] bg-white/[.03] px-2 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-slate-500">{project.project_type}</span></div><p className="mt-4 flex-1 text-sm leading-5 text-slate-400">{project.description}</p><div className="mt-4 flex items-center justify-between gap-3 text-[10px] font-semibold text-slate-500"><span className="flex items-center gap-1"><Download className="size-3" /> {project.downloads ? `${(project.downloads / 1000000).toFixed(1)}m` : "—"} downloads</span><span className="flex items-center gap-1"><Star className="size-3" /> {project.follows || "—"}</span><div className="flex items-center gap-2"><button onClick={() => downloadProject(project)} className="inline-flex items-center gap-1 text-emerald-200 transition hover:text-white"><Download className="size-3" /> Download</button><a href={`https://modrinth.com/${project.project_type}/${project.slug || project.project_id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-200 transition hover:text-white">Open <ArrowUpRight className="size-3" /></a></div></div></article>)}</div>
  </AppShell>;
}

const fieldNotes = [
  ["Release checklist", "Before opening the network: validate backups, server icon, MOTD, permissions, whitelist, and a clean restart.", "01"],
  ["Incident response", "Capture timings, recent logs, TPS/MSPT, player count, and the last deployment before changing multiple variables.", "02"],
  ["Update discipline", "Stage Paper, plugins, and configs in a copy of the world. Keep one known-good jar and rollback path available.", "03"],
  ["Player experience", "Optimize from observed bottlenecks. A stable 20 TPS server with predictable chat and low join latency beats inflated view distance.", "04"],
];
export function GuidesPage() {
  return <AppShell><PageIntro eyebrow="OPERATIONS HANDBOOK" title="Admin Field Notes" description="A professional set of runbooks for the moments that matter: launch, incidents, updates, and player experience."><AccentTag color="violet"><BookOpen className="mr-1 size-3" /> Practical guidance</AccentTag></PageIntro>
    <div className="grid gap-4 md:grid-cols-2">{fieldNotes.map(([title, body, number]) => <article key={title} className="rounded-2xl border border-white/[.08] bg-[#10141c] p-5"><div className="flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl border border-violet-300/20 bg-violet-300/[.07] text-violet-200"><span className="font-mono text-xs">{number}</span></div><CheckCircle2 className="size-4 text-emerald-300/70" /></div><h2 className="mt-5 text-base font-bold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></article>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-2"><SectionCard title="Safe deploy sequence" description="A lightweight process you can repeat for every change."><div className="space-y-2 p-5">{["Create a dated backup or snapshot.", "Change one meaningful variable.", "Restart cleanly and check logs.", "Observe TPS, MSPT, memory, and player reports.", "Record the result and keep the rollback path."].map((item, index) => <div key={item} className="flex gap-3 rounded-lg border border-white/[.06] bg-white/[.02] px-3 py-3 text-sm text-slate-300"><span className="font-mono text-emerald-300">0{index + 1}</span>{item}</div>)}</div></SectionCard><SectionCard title="Useful operator commands" description="Keep these close during a live investigation."><div className="space-y-3 p-4"><CodeBlock label="Paper timings" value="/timings on\n/timings paste\n/timings off" /><CodeBlock label="Server health" value="/spark tps\n/spark profiler start --timeout 60s\n/spark profiler stop" /></div></SectionCard></div>
  </AppShell>;
}
