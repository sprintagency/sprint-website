// Footer "Cookie settings" control. Reopens the consent banner so the visitor
// can change their choice at any time, as promised in the Cookies Policy.
"use client";

import type { CSSProperties } from "react";
import { openConsentSettings } from "@/lib/analytics/consent";

export default function CookieSettingsLink({ style }: { style?: CSSProperties }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="footer-link"
      style={{
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        // The browser default stylesheet forces `letter-spacing: normal` on
        // buttons, and the `font` shorthand does not restore it. Without this
        // the label tracks wider than the sibling footer links.
        letterSpacing: "inherit",
        ...style,
      }}
    >
      Cookie settings
    </button>
  );
}
