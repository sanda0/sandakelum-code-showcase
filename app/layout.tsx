import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ReactNode } from "react";
import Layout from "@/components/Layout";
import { QueryProvider } from "@/components/QueryProvider";

export const metadata = {
  title: "Sandakelum | Software Engineer",
  description: "I'm a self-taught software engineer with experience in building browser extensions, scalable backend services using Golang, Python (FastAPI, Django), and Laravel, as well as full-stack Laravel applications. I also work with React and Vue.js for UI development. My projects often include WebSocket services, REST APIs, and cloud-based tools, many of which are shared on GitHub and Fiverr. Additionally, I create YouTube tutorials and write Medium articles to share knowledge and support the developer community.",
  author: "sandakelum",
  openGraph: {
    title: "Sandakelum | Software Engineer",
    description: "Building scalable backend services, browser extensions, and full-stack applications. Follow my journey through projects, YouTube tutorials, and Medium articles.",
    type: "website",
    url: "https://sandakelum.me/",
    image: "https://sandakelum.me/cover.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandakelum | Software Engineer",
    description: "Building scalable backend services, browser extensions, and full-stack web applications. Follow my journey through projects, YouTube tutorials, and Medium articles.",
    image: "https://sandakelum.me/cover.png",
    site: "@sanda15x",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (

    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Layout>{children}</Layout>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
