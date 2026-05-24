import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ClipboardPaste, Download as DownloadIcon, Wand2, Music, VolumeX } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DownloadProgress } from "@/components/DownloadProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fetch — Download videos and audio" },
      { name: "description", content: "Paste a link, fetch the media. Simple, smooth, and friendly." },
    ],
  }),
  component: Download,
});

type FetchMode = "auto" | "audio" | "mute";

function Download() {
  const [url, setUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [mode, setMode] = useState<FetchMode>("auto");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      /* clipboard blocked */
    }
  };

  const handleFetch = () => {
    if (url.trim()) setDownloading(true);
  };

  const modes: { key: FetchMode; label: string; icon: ReactNode }[] = [
    { key: "auto", label: "Auto", icon: <Wand2 className="size-3.5" strokeWidth={2.5} /> },
    { key: "audio", label: "Audio", icon: <Music className="size-3.5" strokeWidth={2.5} /> },
    { key: "mute", label: "Mute", icon: <VolumeX className="size-3.5" strokeWidth={2.5} /> },
  ];

  return (
    <AppShell>
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight">Fetch</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Paste a link to grab the video or audio.
        </p>
      </header>

      <section className="space-y-5">
        <div className="relative animate-fade-in-up stagger-1">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="https://..."
            className="w-full bg-card pop-border pop-shadow-sm rounded-xl py-4 pl-4 pr-24 text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={handlePaste}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-pop-cyan pop-border rounded-lg px-3 py-1.5 text-xs font-semibold pop-press"
          >
            <ClipboardPaste className="size-3.5" strokeWidth={2.5} />
            Paste
          </button>
        </div>

        <div className="flex items-center justify-between animate-fade-in-up stagger-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Mode
          </span>
          <div className="flex items-center gap-1 bg-card pop-border rounded-lg p-1 pop-shadow-sm">
            {modes.map((m) => {
              const active = mode === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-pop-yellow pop-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m.icon}
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleFetch}
          className="w-full bg-pop-yellow text-foreground py-4 rounded-xl pop-border pop-shadow pop-press font-semibold flex items-center justify-center gap-2 animate-fade-in-up stagger-3"
        >
          <DownloadIcon className="size-5" strokeWidth={2.5} />
          Fetch media
        </button>
      </section>

      {downloading && (
        <section className="mt-8 animate-pop-in">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            In progress
          </h2>
          <DownloadProgress url={url} onCancel={() => setDownloading(false)} />
        </section>
      )}
    </AppShell>
  );
}
