import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClipboardPaste, Download as DownloadIcon, Search, Film, Music, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DownloadProgress } from "@/components/DownloadProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fetch — Download videos and audio" },
      { name: "description", content: "Paste a link, pick a quality, fetch the media." },
    ],
  }),
  component: Download;
});

type Step = "input" | "select" | "downloading";

type Quality = {
  key: string;
  label: string;
  meta: string;
  kind: "video" | "audio";
};

const QUALITIES: Quality[] = [
  { key: "1080p", label: "1080p", meta: "MP4 · ~85 MB", kind: "video" },
  { key: "720p", label: "720p", meta: "MP4 · ~48 MB", kind: "video" },
  { key: "480p", label: "480p", meta: "MP4 · ~22 MB", kind: "video" },
  { key: "audio", label: "Audio only", meta: "MP3 · ~4 MB", kind: "audio" },
];

function Download() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [selected, setSelected] = useState<string>("720p");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      /* clipboard blocked */
    }
  };

  const handleAnalyze = () => {
    if (url.trim()) setStep("select");
  };

  const handleDownload = () => setStep("downloading");

  const reset = () => {
    setStep("input");
  };

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
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-pop-cyan text-ink-fixed pop-border rounded-lg px-3 py-1.5 text-xs font-semibold pop-press"
          >
            <ClipboardPaste className="size-3.5" strokeWidth={2.5} />
            Paste
          </button>
        </div>

        {step === "input" && (
          <button
            onClick={handleAnalyze}
            className="w-full bg-pop-yellow text-ink-fixed py-4 rounded-xl pop-border pop-shadow pop-press font-semibold flex items-center justify-center gap-2 animate-fade-in-up stagger-2"
          >
            <Search className="size-5" strokeWidth={2.5} />
            Fetch media
          </button>
        )}
      </section>

      {step === "select" && (
        <section className="mt-8 animate-pop-in space-y-4">
          {/* Preview card */}
          <div className="bg-card pop-border pop-shadow rounded-2xl p-4 flex gap-3 items-center">
            <div className="size-14 rounded-xl bg-pop-cyan/40 pop-border flex items-center justify-center shrink-0">
              <Film className="size-6" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug truncate">
                Late Night Lo-Fi Beats — Study Mix
              </h3>
              <p className="text-xs text-muted-foreground truncate">{url}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Choose quality
            </h2>
            <div className="space-y-2">
              {QUALITIES.map((q, i) => {
                const active = selected === q.key;
                return (
                  <button
                    key={q.key}
                    onClick={() => setSelected(q.key)}
                    style={{ animationDelay: `${0.05 * (i + 1)}s` }}
                    className={`animate-fade-in-up w-full flex items-center gap-3 rounded-xl pop-border px-3 py-3 text-left transition-colors ${
                      active
                        ? "bg-pop-yellow text-ink-fixed pop-shadow-sm"
                        : "bg-card pop-shadow-sm"
                    }`}
                  >
                    <div className="size-9 rounded-lg bg-background/60 pop-border flex items-center justify-center shrink-0">
                      {q.kind === "audio" ? (
                        <Music className="size-4" strokeWidth={2.5} />
                      ) : (
                        <Film className="size-4" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{q.label}</div>
                      <div className={`text-xs ${active ? "opacity-70" : "text-muted-foreground"}`}>
                        {q.meta}
                      </div>
                    </div>
                    {active && (
                      <div className="size-6 rounded-full bg-foreground text-background flex items-center justify-center">
                        <Check className="size-3.5" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-2 pt-1">
            <button
              onClick={reset}
              className="bg-card px-4 py-3 rounded-xl pop-border pop-shadow-sm pop-press font-semibold text-sm"
            >
              Back
            </button>
            <button
              onClick={handleDownload}
              className="bg-pop-yellow text-ink-fixed py-3 rounded-xl pop-border pop-shadow pop-press font-semibold flex items-center justify-center gap-2"
            >
              <DownloadIcon className="size-5" strokeWidth={2.5} />
              Download
            </button>
          </div>
        </section>
      )}

      {step === "downloading" && (
        <section className="mt-8 animate-pop-in">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            In progress
          </h2>
          <DownloadProgress
            url={url}
            quality={selected}
            onCancel={reset}
          />
        </section>
      )}
    </AppShell>
  );
}
