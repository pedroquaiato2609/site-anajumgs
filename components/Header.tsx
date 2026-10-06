"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuMenu, LuX } from "react-icons/lu";
import { contato, menu, secoes } from "@/lib/content";

const itensMenu = secoes.filter((s) => (menu as readonly string[]).includes(s.id));

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const barras = useRef<(HTMLSpanElement | null)[]>([]);

  // Barra de progresso em segmentos, como a de um story: um trecho por seção.
  useEffect(() => {
    const alvos = secoes.map((s) => document.getElementById(s.id));
    let quadro = 0;

    const atualizar = () => {
      quadro = 0;
      const linha = window.innerHeight * 0.5;
      const noFim =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      alvos.forEach((alvo, i) => {
        const barra = barras.current[i];
        if (!alvo || !barra) return;
        const caixa = alvo.getBoundingClientRect();
        const progresso = noFim ? 1 : (linha - caixa.top) / caixa.height;
        barra.style.transform = `scaleX(${Math.min(1, Math.max(0, progresso))})`;
      });
    };

    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-vinho text-nude">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#inicio" className="font-display text-lg font-semibold italic tracking-tight">
          Ana Julia Magalhães
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm font-medium lg:gap-7">
            {itensMenu.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="elo">
                  {s.rotulo}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="botao bg-rosa !px-4 !py-2 text-vinho"
              >
                <FaWhatsapp aria-hidden="true" className="text-base" />
                <span className="sr-only lg:not-sr-only">WhatsApp</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 flex items-center gap-2 px-2 py-2 text-sm font-medium md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <LuX aria-hidden="true" className="text-xl" /> : <LuMenu aria-hidden="true" className="text-xl" />}
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>

      <div aria-hidden="true" className="wrap flex gap-1 pb-2">
        {secoes.map((s, i) => (
          <span key={s.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-nude/25">
            <span
              ref={(el) => {
                barras.current[i] = el;
              }}
              className="block h-full origin-left scale-x-0 bg-rosa"
            />
          </span>
        ))}
      </div>

      <nav
        id="menu-movel"
        aria-label="Principal"
        hidden={!aberto}
        className="border-t border-nude/15 md:hidden"
      >
        <ul className="wrap py-4">
          {itensMenu.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="display block py-2.5 text-2xl"
                onClick={() => setAberto(false)}
              >
                {s.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
