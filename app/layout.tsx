import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Mrs_Saint_Delafield, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const serifa = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serifa",
  display: "swap",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const assinatura = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-assinatura",
  display: "swap",
});

const titulo = "Ana Julia Magalhães | Comunicação, Marketing e Moda";
const descricao =
  "Portfólio de Ana Julia Magalhães da Silva: social media, audiovisual, storymaking de eventos e comunicação, de um look do dia a um roteiro de vídeo.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  authors: [{ name: "Ana Julia Magalhães da Silva" }],
  keywords: [
    "Ana Julia Magalhães",
    "Comunicação",
    "Marketing",
    "Moda",
    "Social Media",
    "Storymaker",
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
    <html
      lang="pt-BR"
      className={`${serifa.variable} ${grotesk.variable} ${assinatura.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Liga os estados iniciais das animações só quando há JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('anima')" }} />
        {children}
      </body>
    </html>
  );
}
