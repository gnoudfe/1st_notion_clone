import type { Metadata } from "next";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";
import ConvexProvider from "@/components/providers/ConvexProvider";

export const metadata: Metadata = {
  title: "Dotion",
  description: "The connected workspace where better, faster work happens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ConvexProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="dotion-theme"
          >
            {children}
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
