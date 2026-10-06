import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

const titulo = "Ana Julia Magalhães | Marketing & Comunicação";
const descricao =
  "Portfólio de Ana Julia Magalhães da Silva: Social Media, conteúdo audiovisual, eventos e storymaking. Marketing com propósito para aproximar pessoas e marcas.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  authors: [{ name: "Ana Julia Magalhães da Silva" }],
  keywords: [
    "Ana Julia Magalhães",
    "Marketing",
    "Comunicação",
    "Social Media",
    "Storymaker",
    "Criação de conteúdo",
    "Brusque",
  ],
  openGraph: {
    title: titulo,
    description: descricao,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#630625",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${grotesk.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body>
        {/* Liga os estados iniciais das animações só quando há JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('anima')" }} />
        {children}
      </body>
    </html>
  );
}
