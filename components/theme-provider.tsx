"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Writes `class="dark"` on <html> so @xseeduy/tokens `.dark` semantic overrides
 * take effect. Light is the absence of that class.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
