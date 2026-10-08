import Image, { type StaticImageData } from "next/image";

/** Pedaço de fita adesiva (decorativo). */
export function Fita({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`fita ${className}`} />;
}

/** Anotação em letra de assinatura. */
export function Nota({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`nota ${className}`}>{children}</span>;
}

/** Fotografia em moldura de polaroid, com fita e legenda opcional. */
export function Polaroid({
  foto,
  alt,
  legenda,
  giro = -3,
  proporcao = "aspect-[4/5]",
  posicao = "object-center",
  sizes,
  className = "",
}: {
  foto: StaticImageData;
  alt: string;
  legenda?: string;
  giro?: number;
  proporcao?: string;
  posicao?: string;
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      className={`polaroid ${legenda ? "" : "!pb-9"} ${className}`}
      style={{ "--giro": `${giro}deg` } as React.CSSProperties}
    >
      <Fita className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
      <div className={`foto ${proporcao}`}>
        <Image src={foto} alt={alt} fill placeholder="blur" sizes={sizes} className={`object-cover ${posicao}`} />
      </div>
      {legenda && <figcaption className="nota">{legenda}</figcaption>}
    </figure>
  );
}
