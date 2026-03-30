import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "InterviewForge",
    template: "%s | InterviewForge",
  },
  description: "Forge your way into any job. AI-powered personal interview preparation platform with mock interviews, study plans, and progress tracking.",
  keywords: ["interview preparation", "AI interview", "mock interview", "study plan", "coding interview", "technical interview", "job preparation"],
  authors: [{ name: "InterviewForge" }],
  openGraph: {
    type: "website",
    siteName: "InterviewForge",
    title: "InterviewForge – AI-Powered Interview Preparation",
    description: "Forge your way into any job. AI-powered personal interview preparation platform with mock interviews, study plans, and progress tracking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewForge – AI-Powered Interview Preparation",
    description: "Forge your way into any job. AI-powered personal interview preparation platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
