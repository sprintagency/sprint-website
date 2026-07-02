"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dark-themed dropdown that replaces the native <select> so the option list
 * matches the site's dark theme (chevron flips on open, lime for the selected
 * option). Styling hooks: .cs-trigger / .cs-panel / .cs-opt in globals.css.
 */
export default function CustomSelect({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <div
        className="cs-trigger"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          } else if (e.key === "Escape") setOpen(false);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? "rgba(181,230,2,0.6)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 4,
          color: "#fff",
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          padding: "12px 14px",
          cursor: "pointer",
          transition: "border-color 0.2s,background-color 0.2s,box-shadow 0.2s",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: value ? "#fff" : "rgba(255,255,255,0.4)",
          }}
        >
          {value || placeholder}
        </span>
        <span
          style={{
            display: "inline-flex",
            flex: "none",
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "none",
            color: "#8b93a7",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      {open && (
        <div
          className="cs-panel"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 60,
            background: "#0f1729",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 6,
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.85)",
            padding: 6,
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {options.map((o) => (
            <div
              key={o}
              className="cs-opt"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              style={{
                padding: "11px 12px",
                borderRadius: 4,
                color: o === value && value !== "" ? "#b5e602" : "#fff",
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
