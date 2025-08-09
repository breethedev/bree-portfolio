import React, { useId, useMemo, useRef, useState } from "react";
import "./GameTabs.css";

// Minimal, accessible tab system with optional keepAlive
// - Keyboard: ArrowLeft/Right, Home, End
// - aria roles: tablist, tab, tabpanel
// - Unmounts inactive panels by default to prevent background game loops

export type TabItem = {
  id?: string; // optional stable id (else auto)
  label: string;
  render: () => React.ReactNode; // render function to avoid mounting cost
  disabled?: boolean;
};

export type GameTabsProps = {
  tabs: TabItem[];
  initialIndex?: number;
  keepAlive?: boolean; // if true, keep inactive panels mounted (hidden)
  className?: string;
};

export default function GameTabs({
  tabs,
  initialIndex = 0,
  keepAlive = false,
  className = "",
}: GameTabsProps) {
  const baseId = useId();
  const [index, setIndex] = useState(() => Math.min(Math.max(initialIndex, 0), tabs.length - 1));
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const ids = useMemo(
    () =>
      tabs.map((t, i) => ({
        tabId: `${t.id ?? baseId}-tab-${i}`,
        panelId: `${t.id ?? baseId}-panel-${i}`,
      })),
    [tabs, baseId]
  );

  const focusTab = (i: number) => {
    const el = tabRefs.current[i];
    el?.focus();
  };

  const move = (dir: 1 | -1) => {
    let next = index;
    for (let step = 0; step < tabs.length; step++) {
      next = (next + dir + tabs.length) % tabs.length;
      if (!tabs[next]?.disabled) break;
    }
    setIndex(next);
    requestAnimationFrame(() => focusTab(next));
  };

  return (
    <div className={`game-tabs ${className}`}>
      {/* Tablist */}
      <div role="tablist" aria-label="Mini games" className="game-tabs__tablist">
        {tabs.map((t, i) => (
          <button
            key={ids[i].tabId}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={ids[i].tabId}
            role="tab"
            aria-selected={i === index}
            aria-controls={ids[i].panelId}
            tabIndex={i === index ? 0 : -1}
            disabled={t.disabled}
            onClick={() => setIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                move(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(-1);
              } else if (e.key === "Home") {
                e.preventDefault();
                setIndex(0);
                requestAnimationFrame(() => focusTab(0));
              } else if (e.key === "End") {
                e.preventDefault();
                const last = tabs.length - 1;
                setIndex(last);
                requestAnimationFrame(() => focusTab(last));
              }
            }}
            className={`game-tabs__tab ${i === index ? "game-tabs__tab--active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="game-tabs__panels">
        {keepAlive ? (
          tabs.map((t, i) => (
            <div
              key={ids[i].panelId}
              id={ids[i].panelId}
              role="tabpanel"
              aria-labelledby={ids[i].tabId}
              hidden={i !== index}
              className="game-tabs__panel"
            >
              {t.render()}
            </div>
          ))
        ) : (
          // Unmount inactive panels: only render the active one
          <div
            id={ids[index].panelId}
            role="tabpanel"
            aria-labelledby={ids[index].tabId}
            className="game-tabs__panel"
          >
            {tabs[index].render()}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Demo usage (you can remove) ---
export function PortfolioGamesHeader() {
  return (
    <div className="game-tabs-demo">
      <GameTabs
        tabs={[
          { label: "Memory", render: () => <Placeholder name="Memory Game" /> },
          { label: "Blackjack", render: () => <Placeholder name="Blackjack" /> },
        ]}
      />
    </div>
  );
}

function Placeholder({ name }: { name: string }) {
  return <div className="game-tabs-placeholder">{name} goes here.</div>;
}
