import Image from "next/image";
import type { IconType } from "react-icons";
import { FaHandsAslInterpreting, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import {
  LuArrowDown,
  LuArrowUp,
  LuArrowUpRight,
  LuAward,
  LuGraduationCap,
  LuLanguages,
  LuMail,
  LuMapPin,
  LuMessagesSquare,
  LuPlane,
  LuSend,
  LuSmartphone,
  LuVideo,
} from "react-icons/lu";
import Animacoes from "@/components/Animacoes";
import { Fita, Nota, Polaroid } from "@/components/Arte";
import Casos from "@/components/Casos";
import FormContato from "@/components/FormContato";
import Header from "@/components/Header";
import RegistroVisita from "@/components/RegistroVisita";
import { areas, contato, cursos, ferramentas, selos, sobre } from "@/lib/content";

// Fotografias originais, importadas diretamente de fotos-reais/ sem edição.
import fotoPerfil from "@/fotos-reais/ana-julia-01.jpeg";
import fotoTelao from "@/fotos-reais/ana-julia-02.jpeg";
import fotoPalestra from "@/fotos-reais/ana-julia-03.jpeg";
import fotoPlateia from "@/fotos-reais/ana-julia-04.jpeg";
import fotoRetrato from "@/fotos-reais/ana-julia-05.jpeg";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

const faixa = ["Comunicação", "Marketing", "Moda", "Social Media", "Audiovisual", "Storymaker", "Palestras"];

const estiloAreas: { Icone: IconType; cartao: string; coluna: string }[] = [
  { Icone: FaInstagram, cartao: "bg-vinho text-creme", coluna: "md:col-span-4" },
  { Icone: LuVideo, cartao: "bg-fumaca text-chocolate", coluna: "md:col-span-4" },
  { Icone: LuMessagesSquare, cartao: "bg-rosa text-vinho", coluna: "md:col-span-4" },
  { Icone: LuSmartphone, cartao: "bg-chocolate text-creme", coluna: "md:col-span-5" },
];

const canais = [
  {
    rotulo: "WhatsApp",
    valor: contato.telefone,
    href: contato.whatsapp,
    Icone: FaWhatsapp,
    externo: true,
  },
  {
    rotulo: "E-mail",
    valor: contato.email,
    href: `mailto:${contato.email}`,
    Icone: LuMail,
    externo: false,
  },
  {
    rotulo: "LinkedIn",
    valor: "ana-julia-magalhãesdasilva",
    href: contato.linkedin,
    Icone: FaLinkedinIn,
    externo: true,
  },
];

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:bg-creme focus:px-4 focus:py-2 focus:text-vinho"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <Animacoes />
      <RegistroVisita />

      <main id="conteudo" className="overflow-x-clip">
        {/* Hero: fotografia em tela cheia com o título sobreposto */}
        <section id="inicio" className="isolate overflow-hidden bg-vinho text-creme">
          <div className="hero-foto foto relative h-[66svh] min-h-[24rem] md:absolute md:inset-0 md:h-auto">
            <Image
              src={fotoPerfil}
              alt="Ana Julia de perfil, de blusa verde-oliva, registrando um evento com o celular"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[76%_32%] md:object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vinho via-vinho/10 to-vinho/35 md:bg-gradient-to-r md:from-vinho/95 md:via-vinho/45 md:to-transparent" />
          </div>

          {/* Selo giratório: leva para a próxima seção. */}
          <a
            href="#sobre"
            aria-label="Rolar para a seção Sobre"
            className="entra absolute bottom-14 right-10 z-20 hidden size-32 place-items-center rounded-full border border-creme/70 text-creme md:grid"
            style={i(7)}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true" className="gira absolute inset-0 size-full">
              <defs>
                <path id="circulo-selo" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
              </defs>
              <text className="fill-current text-[8.2px] font-semibold uppercase tracking-[0.12em]">
                <textPath href="#circulo-selo" textLength="242">
                  Comunicação • Marketing • Moda • Conteúdo •
                </textPath>
              </text>
            </svg>
            <LuArrowDown aria-hidden="true" className="flutua text-2xl md:text-3xl" />
          </a>

          <div className="wrap relative z-10 -mt-24 pb-14 md:mt-0 md:flex md:min-h-[min(100svh,58rem)] md:flex-col md:justify-end md:pb-20 md:pt-36">
            <h1 className="display text-[clamp(2.9rem,13vw,4.2rem)] uppercase leading-[0.9] md:text-[clamp(4.2rem,7.8vw,7.4rem)]">
              <span className="linha block">
                <span style={i(1)}>Comunicação</span>
              </span>
              <span className="linha block">
                <span style={i(2)}>Marketing</span>
              </span>
              <span className="linha block">
                <span className="it text-rosa" style={i(3)}>
                  Moda
                </span>
              </span>
            </h1>

            <p className="entra mt-6 max-w-[27rem] text-[1.05rem] leading-relaxed text-creme/95" style={i(5)}>
              A comunicação está presente em todos os lugares, seja de um look do dia a um roteiro
              de vídeo.
            </p>

            <div className="entra mt-8 flex flex-wrap items-center gap-3" style={i(6)}>
              <a href="#trabalhos" className="botao bg-rosa text-vinho">
                Conheça meu trabalho
                <LuArrowUpRight aria-hidden="true" />
              </a>
              <a href="#contato" className="botao border border-creme/70 text-creme hover:text-vinho">
                Fale comigo
              </a>
            </div>
          </div>
        </section>

        {/* Faixa em movimento */}
        <div className="faixa bg-rosa py-3.5 text-vinho">
          {[0, 1].map((copia) => (
            <ul key={copia} aria-hidden={copia === 1} className="faixa-trilho">
              {faixa.map((rotulo, n) => (
                <li key={rotulo} className="flex items-center whitespace-nowrap">
                  <span className={`display text-2xl ${n % 2 ? "italic" : "uppercase"}`}>{rotulo}</span>
                  <span aria-hidden="true" className="px-7 text-sm">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Sobre */}
        <section id="sobre" className="overflow-clip bg-vinho py-20 text-creme md:py-28">
          <div className="wrap grid items-center gap-20 md:grid-cols-12 md:gap-8">
            <div
              data-anima="esquerda"
              className="relative mx-auto w-[74%] max-w-xs md:col-span-5 md:mx-0 md:w-auto md:max-w-none md:pl-4 md:pr-20"
            >
              <Polaroid
                foto={fotoRetrato}
                alt="Retrato de Ana Julia sorrindo, de óculos e cabelos cacheados, ao ar livre"
                legenda="Ana Julia"
                giro={-4}
                posicao="object-[50%_28%]"
                sizes="(min-width: 768px) 30vw, 74vw"
              />
              {/* Tira de filme com as fotos dos eventos (decorativa: as fotos reaparecem em Trabalhos). */}
              <div aria-hidden="true" className="filme absolute -bottom-12 -right-8 w-[36%] md:right-4 md:w-[30%]">
                {[fotoPlateia, fotoPalestra, fotoTelao].map((foto, n) => (
                  <div key={n} className="foto aspect-[4/3]">
                    <Image src={foto} alt="" fill sizes="10rem" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <h2 data-anima className="titulo">
                Mais do que <span className="it text-rosa">marketing,</span> pessoas.
              </h2>
              <div data-anima style={d(1)} className="mt-7 max-w-[34rem] space-y-4 text-creme/90">
                {sobre.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
              <ul data-anima style={d(2)} className="mt-8 flex flex-wrap gap-2 text-creme/90">
                {selos.map((selo) => (
                  <li key={selo} className="selo">
                    {selo}
                  </li>
                ))}
              </ul>
              <a
                data-anima
                style={d(3)}
                href="#contato"
                className="botao mt-9 bg-nude text-vinho"
              >
                <LuSend aria-hidden="true" />
                Fale comigo
              </a>
            </div>
          </div>
        </section>

        {/* Trabalhos (abas com as fotos) */}
        <section id="trabalhos" className="bg-rosa-claro py-20 text-vinho md:py-28">
          <div className="wrap">
            <div data-anima className="mb-12 text-center md:mb-16">
              <p className="marca">Trabalhos</p>
              <h2 className="titulo mt-3">
                Do roteiro <span className="it">ao story</span>
              </h2>
            </div>
            <div data-anima style={d(1)}>
              <Casos />
            </div>
          </div>
        </section>

        {/* Frase em destaque sobre fotografia em tela cheia */}
        <section className="foto deriva grid min-h-[28rem] place-items-center bg-chocolate py-24 text-center text-creme md:min-h-[36rem]">
          <Image
            src={fotoPlateia}
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-[35%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate/55 via-vinho/45 to-chocolate/70" />
          <blockquote data-anima className="wrap relative">
            <p className="titulo mx-auto max-w-[18ch] md:!text-[clamp(2.8rem,5.4vw,4.6rem)]">
              “Imagem pessoal <span className="it text-rosa">também é</span> comunicação.”
            </p>
            <footer className="mt-5">
              <Nota className="text-rosa">Ana Julia</Nota>
            </footer>
          </blockquote>
        </section>

        {/* Áreas que eu me solto */}
        <section id="areas" className="bg-creme py-20 text-vinho md:py-28">
          <div className="wrap">
            <h2 data-anima className="titulo mb-12 text-center md:mb-16">
              Áreas que eu <span className="it">me solto</span>
            </h2>

            <ul className="grid gap-4 md:grid-cols-12">
              {areas.map((area, n) => {
                const { Icone, cartao, coluna } = estiloAreas[n];
                return (
                  <li
                    key={area.titulo}
                    data-anima
                    style={d(n % 3)}
                    className={`flex min-h-60 flex-col justify-between gap-8 p-7 md:p-8 ${cartao} ${coluna}`}
                  >
                    <div>
                      <h3 className="display text-[2rem] leading-none">{area.titulo}</h3>
                      <p className="mt-4 text-[0.95rem] leading-relaxed opacity-90">{area.texto}</p>
                    </div>
                    <span className="icone border border-current">
                      <Icone aria-hidden="true" />
                    </span>
                  </li>
                );
              })}

              <li
                data-anima
                style={d(1)}
                className="flex min-h-60 flex-col justify-between gap-8 border border-vinho/25 bg-papel p-7 md:col-span-7 md:p-8"
              >
                <h3 className="marca">Ferramentas do dia a dia</h3>
                <ul className="display flex flex-wrap gap-x-3 gap-y-1 text-[1.7rem] leading-tight md:text-[2rem]">
                  {ferramentas.map((f, n) => (
                    <li key={f} className={n % 2 ? "italic" : ""}>
                      {f}
                      {n < ferramentas.length - 1 && (
                        <span aria-hidden="true" className="pl-3 text-base not-italic text-pessego">
                          ✦
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </section>

        {/* Formação e diferenciais */}
        <section id="formacao" className="bg-rosa-claro py-20 text-vinho md:py-28">
          <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-6">
              <h2 data-anima className="titulo">
                Formação
              </h2>
              <div data-anima style={d(1)} className="mt-9 flex gap-4 border-t border-vinho/30 pt-7">
                <span className="icone bg-vinho text-creme">
                  <LuGraduationCap aria-hidden="true" />
                </span>
                <div>
                  <h3 className="display text-3xl leading-none">Tecnólogo em Marketing</h3>
                  <p className="mt-2 font-semibold">Univali, Universidade do Vale do Itajaí</p>
                  <p className="text-preto/75">Previsão de conclusão: abril de 2027</p>
                </div>
              </div>

              <h3 data-anima className="marca mt-12">
                Cursos e qualificações
              </h3>
              <ul className="mt-3 text-preto">
                {cursos.map((c, n) => (
                  <li
                    key={c}
                    data-anima
                    style={d(n)}
                    className="flex items-start gap-3 border-t border-vinho/30 py-3.5 leading-snug last:border-b"
                  >
                    <LuAward aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-vinho" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 md:col-start-8 md:pt-20">
              <div data-anima="escala" className="relative overflow-hidden bg-vinho px-8 py-10 text-creme">
                <FaHandsAslInterpreting
                  aria-hidden="true"
                  className="flutua absolute -right-3 -top-2 text-[8rem] text-rosa/15"
                />
                <p className="marca text-fumaca">Fluente em</p>
                <p className="display mt-2 text-[clamp(4rem,9vw,6rem)] italic leading-[0.9] text-rosa">Libras</p>
                <p className="mt-4 max-w-[20rem] leading-snug text-creme/90">
                  Língua Brasileira de Sinais, com fluência.
                </p>
              </div>

              <dl data-anima style={d(1)} className="mt-8 text-preto">
                <div className="flex items-center gap-3 border-t border-vinho/30 py-4">
                  <LuLanguages aria-hidden="true" className="shrink-0 text-xl text-vinho" />
                  <dt className="font-semibold">Inglês</dt>
                  <dd className="ml-auto text-right text-preto/75">Básico / Intermediário</dd>
                </div>
                <div className="flex items-center gap-3 border-y border-vinho/30 py-4">
                  <LuPlane aria-hidden="true" className="shrink-0 text-xl text-vinho" />
                  <dt className="font-semibold">Disponibilidade</dt>
                  <dd className="ml-auto text-right text-preto/75">Viagens e eventos</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="overflow-clip bg-vinho pb-8 pt-20 text-creme md:pt-28">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 data-anima className="titulo text-rosa">
                Vamos criar <span className="it">algo juntos?</span>
              </h2>
              <p data-anima style={d(1)} className="mt-5 max-w-[24rem] text-creme/90">
                Preencha o formulário ou chame direto por um dos canais abaixo.
              </p>

              <ul className="mt-8 space-y-3">
                {canais.map(({ rotulo, valor, href, Icone, externo }, n) => (
                  <li key={rotulo} data-anima="esquerda" style={d(n + 2)}>
                    <a
                      href={href}
                      {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center gap-4 rounded-2xl border border-creme/30 p-3 pr-5 transition-colors duration-300 hover:border-rosa hover:bg-creme/[0.06]"
                    >
                      <span className="icone bg-rosa text-vinho">
                        <Icone aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-fumaca">{rotulo}</span>
                        <span className="block break-all text-[0.9rem] font-semibold leading-snug sm:text-base">
                          {valor}
                        </span>
                      </span>
                      <LuArrowUpRight
                        aria-hidden="true"
                        className="ml-auto shrink-0 text-xl text-rosa transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      {externo && <span className="sr-only">(abre em nova aba)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-anima="direita"
              className="relative rounded-[1.75rem] bg-papel p-6 text-preto shadow-2xl shadow-chocolate/50 sm:p-9 lg:col-span-7"
            >
              <Fita className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
              <Nota className="absolute -top-10 right-8 hidden rotate-3 text-rosa sm:block">vamos conversar?</Nota>
              <h3 className="display text-3xl text-vinho">Envie uma mensagem</h3>
              <p className="mb-6 mt-1 text-preto/75">Conte o que você tem em mente.</p>
              <FormContato />
            </div>
          </div>

          <footer className="wrap mt-16 flex flex-col gap-4 border-t border-creme/25 pt-6 text-sm text-creme/80 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
            <p>© 2026 Ana Julia Magalhães da Silva</p>
            <p className="flex items-center gap-2">
              <LuMapPin aria-hidden="true" />
              {contato.cidade}
            </p>
            <a href="#inicio" className="flex items-center gap-2 self-start font-medium sm:self-auto">
              <span className="elo">Voltar ao início</span>
              <LuArrowUp aria-hidden="true" />
            </a>
          </footer>
        </section>
      </main>
    </>
  );
}
