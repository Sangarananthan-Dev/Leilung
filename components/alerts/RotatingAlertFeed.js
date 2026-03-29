"use client";

import { useEffect, useEffectEvent, useState } from "react";

export function RotatingAlertFeed({ alerts, title = "Live Feed" }) {
  const [start, setStart] = useState(0);
  const advance = useEffectEvent(() => {
    setStart((current) => (current + 1) % alerts.length);
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      advance();
    }, 12000);

    return () => {
      window.clearInterval(timer);
    };
  }, [advance]);

  const visible = Array.from(
    { length: Math.min(4, alerts.length) },
    (_, index) => {
      return alerts[(start + index) % alerts.length];
    },
  );

  return (
    <section className="surface-card rounded-[1.75rem] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">
            {title}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((alert) => {
          const tone =
            alert.includes("⚠") || alert.includes("🔴") ? "danger" : "success";
          return (
            <article
              key={alert}
              className="alert-marquee rounded-2xl border border-[rgba(36,48,38,0.08)] bg-[var(--bg-elevated)] px-4 py-3"
            >
              <p
                className={`mb-2 text-xs uppercase tracking-[0.22em] ${
                  tone === "danger" ? "text-red-300" : "text-emerald-300"
                }`}
              >
                {tone === "danger" ? "Attention" : "Progress"}
              </p>
              <p className="text-sm leading-6 text-[var(--text-primary)]">
                {alert}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
