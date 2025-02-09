import type { Metadata } from "next";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";
import ConvexProvider from "@/components/providers/ConvexProvider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "../lib/edgestore";
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
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="dotion-theme"
            >
              <Toaster position="bottom-center" theme="dark" duration={2000} />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
