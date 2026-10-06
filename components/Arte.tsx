// Elementos gráficos decorativos: bordas rasgadas, rabiscos, manchas, fitas e notas à mão.
// Tudo aqui é aria-hidden, exceto <Nota>, que carrega texto de verdade.

function sorteio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Borda de papel rasgado no topo de uma seção, na cor da seção anterior. */
export function Rasgo({ cor, semente = 1 }: { cor: string; semente?: number }) {
  const r = sorteio(semente);
  const passos = 110;
  let y = 5;
  const pontos: string[] = [];
  for (let k = 0; k <= passos; k++) {
    y = Math.max(1.5, Math.min(9.2, y + (r() - 0.5) * 3.4));
    const x = (k / passos) * 100 + (k > 0 && k < passos ? (r() - 0.5) * 0.5 : 0);
    pontos.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-4 w-full -translate-y-px lg:h-7"
      style={{ color: cor }}
    >
      <path fill="currentColor" d={`M0,0 L${pontos.join(" L")} L100,0 Z`} />
    </svg>
  );
}

const riscos = {
  sublinhado: {
    caixa: "0 0 200 22",
    tracos: ["M4,11 C32,3 54,17 82,9 S132,4 160,11 S190,7 196,10", "M16,18 C64,12 122,20 184,15"],
    espessura: 3.2,
  },
  circulo: {
    caixa: "0 0 220 110",
    tracos: [
      "M118,10 C60,4 10,24 12,56 C14,90 66,104 116,102 C168,100 212,82 208,50 C205,22 158,6 104,12 C74,15 46,26 34,40",
    ],
    espessura: 2.6,
  },
  seta: {
    caixa: "0 0 100 64",
    tracos: ["M6,10 C34,2 66,16 84,50", "M84,50 L68,44", "M84,50 L86,33"],
    espessura: 2.6,
  },
  pincelada: {
    caixa: "0 0 200 40",
    tracos: ["M6,22 C46,12 96,30 194,16", "M12,30 C70,22 130,34 188,26"],
    espessura: 13,
  },
  estrela: {
    caixa: "0 0 60 60",
    tracos: ["M30,4 L30,56", "M4,30 L56,30", "M11,11 L49,49", "M49,11 L11,49"],
    espessura: 2.4,
  },
} as const;

/** Rabisco feito à mão que se desenha quando entra na tela. */
export function Risco({
  tipo,
  className = "",
}: {
  tipo: keyof typeof riscos;
  className?: string;
}) {
  const { caixa, tracos, espessura } = riscos[tipo];
  return (
    <svg aria-hidden="true" viewBox={caixa} className={`risco pointer-events-none ${className}`}>
      {tracos.map((d, n) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          strokeWidth={espessura}
          style={{ "--n": n } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

/**
 * Recorte de papel de contorno irregular, na cor do texto (use text-*).
 * Gira devagar e reage de leve ao mouse; `p` é a força desse deslocamento.
 */
export function Forma({ className = "", p = 12 }: { className?: string; p?: number }) {
  const r = sorteio(Math.abs(p) * 7 + 3);
  const fases = [r() * 6.28, r() * 6.28, r() * 6.28];
  const lados = 46;
  const pontos: string[] = [];
  for (let k = 0; k < lados; k++) {
    const a = (k / lados) * Math.PI * 2;
    const raio =
      72 +
      12 * Math.sin(2 * a + fases[0]) +
      8 * Math.sin(3 * a + fases[1]) +
      5 * Math.sin(5 * a + fases[2]) +
      (r() - 0.5) * 5;
    pontos.push(`${(Math.cos(a) * raio).toFixed(1)},${(Math.sin(a) * raio).toFixed(1)}`);
  }
  return (
    <span
      aria-hidden="true"
      className={`forma ${className}`}
      style={{ "--p": `${p}px` } as React.CSSProperties}
    >
      <svg viewBox="-100 -100 200 200" preserveAspectRatio="none" className="size-full">
        <polygon points={pontos.join(" ")} fill="currentColor" />
      </svg>
    </span>
  );
}

/** Pedaço de fita adesiva. */
export function Fita({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`fita ${className}`} />;
}

/** Anotação em letra de mão. */
export function Nota({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`nota ${className}`}>{children}</span>;
}
