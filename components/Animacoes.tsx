"use client";

import { useEffect } from "react";

// Marca com .visivel o que entra na tela e anima os números de [data-conta].
export default function Animacoes() {
  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revelar = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visivel");
          revelar.unobserve(entrada.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-anima], .traco").forEach((el) => revelar.observe(el));

    const contar = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          contar.unobserve(entrada.target);
          const el = entrada.target as HTMLElement;
          const alvo = Number(el.dataset.conta);
          if (reduzido || !Number.isFinite(alvo)) return;

          const inicio = performance.now();
          const duracao = 1400;
          const passo = (agora: number) => {
            const t = Math.min(1, (agora - inicio) / duracao);
            el.textContent = String(Math.round(alvo * (1 - Math.pow(1 - t, 3))));
            if (t < 1) requestAnimationFrame(passo);
          };
          el.textContent = "0";
          requestAnimationFrame(passo);
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-conta]").forEach((el) => contar.observe(el));

    // As manchas (.forma) se deslocam de leve conforme o mouse, via --mx/--my.
    const raiz = document.documentElement;
    const seguir = (e: PointerEvent) => {
      raiz.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
      raiz.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };
    if (!reduzido && window.matchMedia("(pointer: fine)").matches)
      window.addEventListener("pointermove", seguir, { passive: true });

    return () => {
      revelar.disconnect();
      contar.disconnect();
      window.removeEventListener("pointermove", seguir);
    };
  }, []);

  return null;
}
