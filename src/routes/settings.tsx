import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Video, Music } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Fetch" },
      { name: "description", content: "Configure video and audio download preferences." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`w-12 h-7 rounded-full pop-border relative transition-colors ${
        on ? "bg-pop-cyan" : "bg-muted"
      }`}
    >
      <div
        className={`absolute top-0.5 size-5 bg-card pop-border rounded-full transition-all ${
          on ? "left-[20px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between py-2">{children}</div>;
}

function SectionCard({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: typeof Video;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`size-7 rounded-lg pop-border flex items-center justify-center ${accent}`}>
          <Icon className="size-4" strokeWidth={2.5} />
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="bg-card pop-border pop-shadow rounded-2xl p-4 divide-y divide-foreground/10">
        {children}
      </div>
    </section>
  );
}

function SettingsPage() {
  const [resolution, setResolution] = useState("1080p");
  const [saveGallery, setSaveGallery] = useState(true);
  const [hwAccel, setHwAccel] = useState(false);
  const [bitrate, setBitrate] = useState(256);
  const [audioFormat, setAudioFormat] = useState("MP3");
  const [embedMeta, setEmbedMeta] = useState(true);

  return (
    <AppShell>
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tune how Fetch grabs your media.
        </p>
      </header>

      <div className="space-y-6">
        <div className="animate-fade-in-up stagger-1">
        <SectionCard icon={Video} title="Video" accent="bg-pop-pink text-white">
          <Row>
            <span className="text-sm font-medium">Resolution</span>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="bg-pop-yellow pop-border rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
            >
              <option>2160p</option>
              <option>1440p</option>
              <option>1080p</option>
              <option>720p</option>
            </select>
          </Row>
          <Row>
            <span className="text-sm font-medium">Save to gallery</span>
            <Toggle on={saveGallery} onChange={setSaveGallery} />
          </Row>
          <Row>
            <div>
              <p className="text-sm font-medium">Hardware acceleration</p>
              <p className="text-xs text-muted-foreground">Faster processing</p>
            </div>
            <Toggle on={hwAccel} onChange={setHwAccel} />
          </Row>
        </SectionCard>

        <SectionCard icon={Music} title="Audio" accent="bg-pop-cyan">
          <div className="py-3 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Bitrate</span>
              <span className="text-xs font-semibold">{bitrate} kbps</span>
            </div>
            <input
              type="range"
              min={96}
              max={320}
              step={32}
              value={bitrate}
              onChange={(e) => setBitrate(Number(e.target.value))}
              className="w-full accent-pop-pink"
            />
          </div>
          <Row>
            <span className="text-sm font-medium">Format</span>
            <div className="flex gap-1.5">
              {(["MP3", "WAV", "FLAC"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setAudioFormat(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold pop-border ${
                    audioFormat === f
                      ? "bg-foreground text-background"
                      : "bg-card text-muted-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Row>
          <Row>
            <span className="text-sm font-medium">Embed metadata</span>
            <Toggle on={embedMeta} onChange={setEmbedMeta} />
          </Row>
        </SectionCard>
      </div>
    </AppShell>
  );
}
