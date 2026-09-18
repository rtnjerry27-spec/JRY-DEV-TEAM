import { Link, useLocation } from "wouter";
import { ChevronLeft, Code2, Copy, Home, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { tools, classNames } from "@/lib/toolkit";

const accentClasses = {
  emerald: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  aqua: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  violet: "border-violet-400/25 bg-violet-400/10 text-violet-200",
};

export function copyText(value: string, label = "Copied to clipboard") {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(
      () => toast.success(label, { description: "Ready to paste into your server project." }),
      () => toast.error("Could not access the clipboard"),
    );
  } else {
    toast.message(value, { description: "Clipboard access is unavailable in this browser." });
  }
}

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  return (
    <button
      onClick={() => copyText(value, "Copied to Clipboard!")}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.055] px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-300/35 hover:bg-emerald-300/10 hover:text-emerald-200 active:scale-[.97]"
      aria-label={label}
    >
      <Copy className="size-3.5" /> {label}
    </button>
  );
}

export function SectionCard({
  children,
  className,
  title,
  description,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <section className={classNames("panel overflow-hidden", className)}>
      {(title || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div>
            {title && <h2 className="text-sm font-bold tracking-tight text-white">{title}</h2>}
            {description && <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function CodeBlock({ value, label }: { value: string; label?: string }) {
  return (
    <div className="code-block group relative">
      {label && <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</span>}
      <pre className="overflow-x-auto whitespace-pre-wrap pr-16 text-xs leading-5 text-slate-300">{value}</pre>
      <div className="absolute right-3 top-3 opacity-100 sm:opacity-0 sm:transition group-hover:opacity-100">
        <CopyButton value={value} />
      </div>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 border-b border-white/[0.07] pb-6 lg:flex-row lg:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#55ff55]" />
          {eyebrow}
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
}

function NavItem({ href, label, icon: Icon, active, compact }: { href: string; label: string; icon: typeof Home; active: boolean; compact?: boolean }) {
  return (
    <Link
      href={href}
      className={classNames(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
        active ? "bg-white/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.07)]" : "text-slate-500 hover:bg-white/[0.045] hover:text-slate-200",
      )}
    >
      <Icon className={classNames("size-4 shrink-0", active ? "text-emerald-300" : "text-slate-600 group-hover:text-slate-400")} />
      {!compact && <span>{label}</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isCommandOpen, setCommandOpen] = useState(false);
  const matching = useMemo(
    () => tools.filter((tool) => `${tool.name} ${tool.description} ${tool.tag}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sidebar = (
    <aside className="flex h-full flex-col bg-[#0d1016]/95 px-3 py-4 backdrop-blur-xl">
      <Link href="/" className="mb-7 flex items-center gap-3 px-3">
        <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-amber-300/20 bg-black/20 shadow-[0_0_24px_rgba(255,180,50,.18)]">
          <img src="/manus-storage/JRYDEV_ebbf68cc.png" alt="JRY DEV" className="size-full object-contain" />
        </div>
        <div>
          <span className="font-display block text-base font-bold tracking-tight text-white">JRY DEV</span>
          <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-amber-200/60">Minecraft studio</span>
        </div>
      </Link>
      <nav className="space-y-1">
        <NavItem href="/" label="Command Center" icon={Home} active={location === "/"} />
      </nav>
      <div className="mt-7 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">Build tools</div>
      <nav className="mt-2 space-y-1 overflow-y-auto pr-1">
        {tools.map((tool) => (
          <NavItem key={tool.id} href={tool.path} label={tool.shortName} icon={tool.icon} active={location === tool.path} />
        ))}
      </nav>
      <div className="mt-auto rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300"><Code2 className="size-3.5 text-cyan-300" /> JRY DEV suite</div>
        <p className="mt-1.5 text-[11px] leading-4 text-slate-600">Built for serious server rooms.</p>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#090c11] text-slate-100">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.07] lg:block">{sidebar}</div>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.07] bg-[#090c11]/80 px-4 backdrop-blur-xl lg:ml-64 lg:px-8">
        <button onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 lg:hidden" aria-label="Open navigation"><Menu className="size-4" /></button>
        <button onClick={() => setCommandOpen(true)} className="hidden min-w-[280px] items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-left text-xs text-slate-600 transition hover:border-white/[0.14] sm:flex">
          <span className="flex items-center gap-2"><Search className="size-3.5" /> Search tools and commands</span>
          <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-500">⌘ K</kbd>
        </button>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="hidden sm:inline">Minecraft Java Edition</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-2.5 py-1 text-[10px] font-semibold text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#55ff55]" /> Systems nominal</span>
        </div>
      </header>
      <main className="px-4 py-7 lg:ml-64 lg:px-8 lg:py-9">{children}</main>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative h-full w-[275px] border-r border-white/10 shadow-2xl">{sidebar}<button onClick={() => setOpen(false)} className="absolute right-3 top-4 grid size-8 place-items-center rounded-lg bg-white/[0.07] text-slate-400"><X className="size-4" /></button></div>
        </div>
      )}

      {isCommandOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-start bg-black/75 px-4 pt-[15vh] backdrop-blur-sm" onMouseDown={() => setCommandOpen(false)}>
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#11151e] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4"><Search className="size-4 text-emerald-300" /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tools…" className="h-14 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600" /><button onClick={() => setCommandOpen(false)} className="text-slate-600 hover:text-slate-300"><X className="size-4" /></button></div>
            <div className="max-h-[320px] overflow-y-auto p-2">
              {matching.length ? matching.map((tool) => { const Icon = tool.icon; return <Link key={tool.id} href={tool.path} onClick={() => setCommandOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.06]"><div className={classNames("grid size-8 place-items-center rounded-lg border", accentClasses[tool.accent])}><Icon className="size-4" /></div><div><div className="text-sm font-semibold text-slate-100">{tool.name}</div><div className="text-xs text-slate-500">{tool.description}</div></div></Link> }) : <div className="px-3 py-10 text-center text-sm text-slate-500">No matching tools.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BackToTools() {
  return <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-emerald-300"><ChevronLeft className="size-3.5" /> All tools</Link>;
}

export function AccentTag({ children, color = "emerald" }: { children: ReactNode; color?: keyof typeof accentClasses }) {
  return <span className={classNames("inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]", accentClasses[color])}>{children}</span>;
}
