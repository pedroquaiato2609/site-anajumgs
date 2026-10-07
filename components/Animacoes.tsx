"use client";

import { useEffect } from "react";

// Marca com .visivel o que entra na tela, para o CSS fazer o reveal.
export default function Animacoes() {
  useEffect(() => {
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
    document.querySelectorAll("[data-anima]").forEach((el) => revelar.observe(el));
    return () => revelar.disconnect();
  }, []);

  return null;
}
