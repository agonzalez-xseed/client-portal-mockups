import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { IconProvider } from "@xseeduy/icons";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Xseed Client Portal",
  description: "Client portal mockups for Xseed",
};

/** `cover` lets the mobile bottom nav pad itself clear of the iOS home indicator. */
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`} suppressHydrationWarning>
      <body className="h-full bg-surface-page text-text-primary antialiased">
        <ThemeProvider>
          <IconProvider>{children}</IconProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
