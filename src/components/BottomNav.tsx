import { Link, useRouterState } from "@tanstack/react-router";
import { Download, Settings } from "lucide-react";

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const tabs = [
    { to: "/", label: "Download", icon: Download },
    { to: "/settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card pop-border border-l-0 border-r-0 border-b-0">
      <div className="mx-auto flex max-w-md items-center gap-2 p-3">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 pop-border pop-press font-semibold text-sm ${
                active
                  ? "bg-pop-yellow pop-shadow-sm"
                  : "bg-card text-muted-foreground"
              }`}
            >
              <Icon className="size-4" strokeWidth={2.5} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
