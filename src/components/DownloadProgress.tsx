import { Pause, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onCancel: () => void;
  url: string;
}

export function DownloadProgress({ onCancel, url }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + Math.random() * 4)));
    }, 400);
    return () => clearInterval(id);
  }, []);

  const speed = (8 + Math.sin(progress / 8) * 3).toFixed(1);
  const remaining = Math.max(0, Math.round((100 - progress) * 0.6));

  return (
    <div className="animate-fade-in-up space-y-5">
      <div className="bg-card pop-border pop-shadow rounded-2xl overflow-hidden">
        <div className="aspect-video bg-pop-cyan/30 pop-border border-x-0 border-t-0 flex items-center justify-center">
          <div className="size-14 rounded-full bg-card pop-border flex items-center justify-center">
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-foreground ml-1" />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold leading-snug">
              Late Night Lo-Fi Beats — Study Mix
            </h3>
            <p className="text-xs text-muted-foreground mt-1 truncate">{url}</p>
          </div>

          <div className="space-y-2">
            <div className="relative h-6 w-full pop-border rounded-full bg-pop-cream overflow-hidden">
              <div
                className="h-full bg-pop-pink border-r-2 border-foreground transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                {Math.round(progress)}%
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>{speed} MB/s</span>
              <span>{remaining}s left</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 bg-card py-3 rounded-xl pop-border pop-shadow-sm pop-press font-semibold text-sm">
          <Pause className="size-4" strokeWidth={2.5} />
          Pause
        </button>
        <button
          onClick={onCancel}
          className="flex items-center justify-center gap-2 bg-pop-pink text-white py-3 rounded-xl pop-border pop-shadow-sm pop-press font-semibold text-sm"
        >
          <X className="size-4" strokeWidth={2.5} />
          Cancel
        </button>
      </div>
    </div>
  );
}
