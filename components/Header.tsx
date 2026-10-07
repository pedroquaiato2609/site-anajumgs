"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuMenu, LuX } from "react-icons/lu";
import { contato, menu } from "@/lib/content";

const esquerda = menu.slice(0, 3);
const direita = menu.slice(3);

export default function Header() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  const elo = (item: (typeof menu)[number]) => (
    <li key={item.id}>
      <a href={`#${item.id}`} className="elo">
        {item.rotulo}
      </a>
    </li>
  );

  return (
    <header className="fixed inset-x-3 top-3 z-50 text-nude md:inset-x-6">
      {/* Barra arredondada, com o nome ao centro. */}
      <div className="mx-auto grid h-12 max-w-[76rem] grid-cols-[1fr_auto] items-center rounded-full bg-vinho px-5 shadow-lg shadow-chocolate/25 md:grid-cols-[1fr_auto_1fr] md:px-7">
        <nav aria-label="Principal" className="marca hidden md:block">
          <ul className="flex items-center gap-6">{esquerda.map(elo)}</ul>
        </nav>

        <a href="#inicio" className="display text-lg uppercase tracking-[0.04em] md:text-xl">
          Ana Julia Magalhães
        </a>

        <nav aria-label="Secundária" className="marca hidden md:block">
          <ul className="flex items-center justify-end gap-6">
            {direita.map(elo)}
            <li>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (abre em nova aba)"
                className="grid size-8 place-items-center rounded-full bg-rosa text-base text-vinho transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="marca -mr-2 flex items-center gap-2 justify-self-end px-2 py-2 md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <LuX aria-hidden="true" className="text-lg" /> : <LuMenu aria-hidden="true" className="text-lg" />}
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>

      <nav
        id="menu-movel"
        aria-label="Principal"
        hidden={!aberto}
        className="mt-2 rounded-3xl bg-vinho px-6 py-4 shadow-lg shadow-chocolate/25 md:hidden"
      >
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="display block py-2.5 text-3xl uppercase"
                onClick={() => setAberto(false)}
              >
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
