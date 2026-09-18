import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowRight, Command, Search, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell, AccentTag } from "@/components/AppShell";
import { classNames, tools } from "@/lib/toolkit";

const accent = {
  emerald: "from-emerald-300/15 to-emerald-400/0 text-emerald-300 group-hover:border-emerald-300/35",
  aqua: "from-cyan-300/15 to-cyan-400/0 text-cyan-200 group-hover:border-cyan-300/35",
  violet: "from-violet-300/15 to-violet-400/0 text-violet-200 group-hover:border-violet-300/35",
};

export default function Home() {
  // The useAuth hook provides authentication state.
  // To implement login/logout, call logout(), or start login from an event
  // handler: onClick={() => startLogin()} (imported from "@/const"). Never call
  // startLogin() during render (no href={startLogin()}) — it mints a one-time
  // nonce cookie and must run only at the moment of navigation.
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [query, setQuery] = useState("");
  const filteredTools = useMemo(
    () => tools.filter((tool) => `${tool.name} ${tool.description} ${tool.tag}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <AppShell>
      <section className="relative isolate overflow-hidden rounded-2xl border border-white/[0.07] bg-[#10151c] shadow-2xl">
        <img src="/manus-storage/blockforge-hero_d7ceb6e1.png" alt="Emerald and aqua voxel cave" className="absolute inset-0 -z-20 size-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#10141bee_0%,#10141bda_35%,#10141b48_74%,#10141b20_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(85,255,85,.12),transparent_35%)]" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <AccentTag color="emerald"><Sparkles className="mr-1.5 size-3" /> Minecraft server intelligence</AccentTag>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            The ultimate server<br /><span className="text-gradient">developer studio.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">JRY DEV brings your Minecraft Java workflow together: format, configure, optimize, discover plugins, and ship with confidence.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#tools" className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-bold text-[#07100e] shadow-[0_0_30px_rgba(85,255,85,.2)] transition hover:bg-emerald-200 active:scale-[.97]">Explore tools <ArrowRight className="size-4" /></a>
            <Link href="/server-status" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10 active:scale-[.97]"><Zap className="size-4 text-cyan-200" /> Check a server</Link>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-semibold text-slate-300 backdrop-blur sm:flex"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#55ffff]" /> Java toolchain online</div>
      </section>

      <section id="tools" className="mt-10 scroll-mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Workbench</div>
            <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-white">Choose a utility</h2>
          </div>
          <label className="relative block w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-600" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter tools…" className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] pl-9 pr-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-emerald-300/45 focus:ring-2 focus:ring-emerald-300/10" /></label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={tool.path} className={classNames("group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10141c] p-5 shadow-[0_10px_30px_rgba(0,0,0,.12)] transition duration-200 hover:-translate-y-1 hover:bg-[#121822]", accent[tool.accent])} style={{ animationDelay: `${index * 35}ms` }}>
                <div className={classNames("absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0 transition group-hover:opacity-100", accent[tool.accent])} />
                <div className="flex items-start justify-between gap-3">
                  <div className={classNames("grid size-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br", accent[tool.accent])}><Icon className="size-5" /></div>
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500">{tool.tag}</span>
                </div>
                <h3 className="mt-5 text-base font-bold tracking-tight text-white">{tool.name}</h3>
                <p className="mt-1.5 min-h-10 text-sm leading-5 text-slate-500">{tool.description}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-400 transition group-hover:text-white">Open tool <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></div>
              </Link>
            );
          })}
        </div>
        {!filteredTools.length && <div className="mt-5 rounded-2xl border border-dashed border-white/10 py-12 text-center text-sm text-slate-500">No tools match “{query}”. Try another keyword.</div>}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Copy-ready output", "Never hand-transcribe a config again. Every export is selectable and copy-safe."],
          ["Live public APIs", "Status and software build data resolve directly from official community endpoints."],
          ["Built for Java admins", "Practical formats for Paper, Purpur, Bukkit, Bungee, MiniMessage, and TAB."],
        ].map(([title, body], index) => <div key={title} className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-4"><Command className={classNames("size-4", index === 1 ? "text-cyan-300" : "text-emerald-300")} /><h3 className="mt-3 text-sm font-bold text-slate-200">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{body}</p></div>)}
      </section>
    </AppShell>
  );
}
