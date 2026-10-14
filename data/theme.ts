import type { CSSProperties } from "react";

// User-selected Tastemaker L6: playful / light / seed 23.
// Ink variants retain the selected hue and keep small text readable on tints.
export const theme = {
  name: "Lilac Pearl",
  mode: "light",
  mood: "playful",
  seed: 23,
  roles: {
    bg: "#fcf6fd",
    surface: "#f2ecf3",
    primary: "#994fa6",
    "on-primary": "#ffffff",
    secondary: "#efd3f4",
    accent: "#b84b7f",
    border: "#e2dbe3",
    text: "#1f1820",
    muted: "#625b64",
    paper: "#ffffff",
    "primary-ink": "#80368d",
    "accent-ink": "#9f3567",
    "primary-hover": "#874291",
    "border-strong": "#847389",
    green: "#377953",
    "error-bg": "#f8e9f0",
  },
} as const;

export const themeCSSVariables = Object.fromEntries(
  Object.entries(theme.roles).map(([role, value]) => [`--${role}`, value]),
) as CSSProperties;
