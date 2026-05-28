import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onCancel: () => void;
  url: string;
  quality: string;
}

export function DownloadProgress({ onCancel, url, quality }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + Math.random() * 5)));
    }, 350);
    return () => clearInterval(id);
  }, []);

  const speed = (8 + Math.sin(progress / 8) * 3).toFixed(1);
  const remaining = Math.max(0, Math.round((100 - progress) * 0.6));
  const done = progress >= 100;

  return (
    <div className="bg-card pop-border pop-shadow rounded-2xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug truncate">
            Late Night Lo-Fi Beats
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {quality} · {url}
          </p>
        </div>
        <button
          onClick={onCancel}
          aria-label="Cancel"
          className="size-8 rounded-lg bg-pop-pink text-white pop-border flex items-center justify-center pop-press shrink-0"
        >
          <X className="size-4" strokeWidth={2.5} />
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="relative h-3 w-full pop-border rounded-full bg-background overflow-hidden">
          <div
            className="h-full bg-pop-yellow transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>{Math.round(progress)}%</span>
          <span>
            {done ? "Done" : `${speed} MB/s · ${remaining}s left`}
          </span>
        </div>
      </div>
    </div>
  );
}
