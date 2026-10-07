"use client";

import { useRef, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { Polaroid } from "@/components/Arte";

// Fotografias originais, importadas diretamente de fotos-reais/ sem edição.
import fotoTelao from "@/fotos-reais/ana-julia-02.jpeg";
import fotoPalestra from "@/fotos-reais/ana-julia-03.jpeg";
import fotoPlateia from "@/fotos-reais/ana-julia-04.jpeg";

const redes = [
  { nome: "Instagram", Icone: FaInstagram },
  { nome: "LinkedIn", Icone: FaLinkedinIn },
  { nome: "TikTok", Icone: FaTiktok },
  { nome: "YouTube", Icone: FaYoutube },
];

const casos = [
  {
    id: "social",
    aba: "Social Media",
    cor: "bg-fumaca text-vinho",
    titulo: "Social",
    italico: "Media",
    texto:
      "Gestão de Instagram, LinkedIn, TikTok e YouTube: planejamento de conteúdo, publicações toda semana e análise de métricas e do crescimento dos perfis.",
    foto: fotoPlateia,
    alt: "Ana Julia sentada na plateia de um evento, gravando com o celular",
    legenda: "de olho no palco",
    posicao: "object-[30%_50%]",
    giro: -3,
    comRedes: true,
  },
  {
    id: "audiovisual",
    aba: "Audiovisual",
    cor: "bg-cereja text-creme",
    titulo: "Conteúdo",
    italico: "Audiovisual",
    texto:
      "Roteiros, captação e edição de vídeos institucionais, da montagem do cenário à maquiagem para a gravação.",
    foto: fotoTelao,
    alt: "Ana Julia filmando com o celular um telão iluminado em um evento",
    legenda: "registrando o telão",
    posicao: "object-[42%_50%]",
    giro: 3,
    comRedes: false,
  },
  {
    id: "storymaker",
    aba: "Storymaker",
    cor: "bg-creme text-vinho",
    titulo: "Storymaker",
    italico: "de eventos",
    texto: "Registrando o que está acontecendo ao vivo.",
    foto: fotoPalestra,
    alt: "Celular nas mãos de Ana Julia gravando uma palestra; na plateia, camisetas com a frase Conectados de Norte a Sul",
    legenda: "gravando a palestra",
    posicao: "object-[36%_50%]",
    giro: -2,
    comRedes: false,
  },
];

export default function Casos() {
  const [ativo, setAtivo] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const caso = casos[ativo];

  const ir = (n: number, focar = false) => {
    const destino = (n + casos.length) % casos.length;
    setAtivo(destino);
    if (focar) abas.current[destino]?.focus();
  };

  return (
    <div className="mx-auto max-w-[60rem]">
      <div
        role="tablist"
        aria-label="Trabalhos"
        className="flex items-end gap-1 sm:gap-1.5"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") ir(ativo + 1, true);
          if (e.key === "ArrowLeft") ir(ativo - 1, true);
        }}
      >
        {casos.map((c, n) => (
          <button
            key={c.id}
            ref={(el) => {
              abas.current[n] = el;
            }}
            type="button"
            role="tab"
            id={`aba-${c.id}`}
            aria-selected={n === ativo}
            aria-controls="painel-trabalhos"
            tabIndex={n === ativo ? 0 : -1}
            onClick={() => ir(n)}
            className={`aba ${n === ativo ? "bg-vinho text-creme" : c.cor}`}
          >
            {c.aba}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="painel-trabalhos"
        aria-labelledby={`aba-${caso.id}`}
        className="rounded-b-[1.75rem] bg-vinho px-6 pb-10 pt-12 text-creme shadow-2xl shadow-chocolate/30 sm:px-10 md:p-14"
      >
        <div key={caso.id} className="troca grid items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-14">
          <Polaroid
            foto={caso.foto}
            alt={caso.alt}
            legenda={caso.legenda}
            giro={caso.giro}
            proporcao="aspect-[5/4]"
            posicao={caso.posicao}
            sizes="(min-width: 768px) 26rem, 80vw"
            className="mx-auto w-[88%] max-w-sm md:w-full"
          />

          <div>
            <h3 className="titulo !text-[clamp(2rem,3.8vw,3.2rem)] text-rosa">
              {caso.titulo} <span className="it">{caso.italico}</span>
            </h3>
            <p className="mt-4 max-w-[30rem] text-creme/90">{caso.texto}</p>

            {caso.comRedes && (
              <ul className="mt-5 flex flex-wrap gap-2 text-creme/90">
                {redes.map(({ nome, Icone }) => (
                  <li key={nome} className="selo">
                    <Icone aria-hidden="true" />
                    {nome}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => ir(ativo + 1)}
              className="botao mt-8 bg-rosa text-vinho"
            >
              Próximo trabalho
              <LuArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
