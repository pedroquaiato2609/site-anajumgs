import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaHandsAslInterpreting,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import {
  LuArrowDown,
  LuArrowUp,
  LuArrowUpRight,
  LuAward,
  LuCalendarDays,
  LuClapperboard,
  LuCpu,
  LuEye,
  LuGraduationCap,
  LuHandshake,
  LuLanguages,
  LuMail,
  LuMapPin,
  LuMessagesSquare,
  LuMic,
  LuPenLine,
  LuPlane,
  LuSend,
  LuSmartphone,
  LuUsers,
  LuVideo,
} from "react-icons/lu";
import Animacoes from "@/components/Animacoes";
import { Fita, Forma, Nota, Rasgo, Risco } from "@/components/Arte";
import FormContato from "@/components/FormContato";
import Header from "@/components/Header";
import RegistroVisita from "@/components/RegistroVisita";
import {
  competencias,
  contato,
  cursos,
  experiencias,
  ferramentas,
  outrasExperiencias,
} from "@/lib/content";

// Fotografias originais, importadas diretamente de fotos-reais/ sem edição.
import fotoPerfil from "@/fotos-reais/ana-julia-01.jpeg";
import fotoTelao from "@/fotos-reais/ana-julia-02.jpeg";
import fotoPalestra from "@/fotos-reais/ana-julia-03.jpeg";
import fotoPlateia from "@/fotos-reais/ana-julia-04.jpeg";
import fotoRetrato from "@/fotos-reais/ana-julia-05.jpeg";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

const redes: { nome: string; Icone: IconType }[] = [
  { nome: "Instagram", Icone: FaInstagram },
  { nome: "LinkedIn", Icone: FaLinkedinIn },
  { nome: "TikTok", Icone: FaTiktok },
  { nome: "YouTube", Icone: FaYoutube },
];

const faixa: { rotulo: string; Icone: IconType }[] = [
  { rotulo: "Social Media", Icone: FaInstagram },
  { rotulo: "Conteúdo audiovisual", Icone: LuClapperboard },
  { rotulo: "Eventos", Icone: LuCalendarDays },
  { rotulo: "Storymaking", Icone: LuSmartphone },
  { rotulo: "Planejamento de conteúdo", Icone: LuPenLine },
  { rotulo: "Palestras", Icone: LuMic },
];

const iconesCompetencias: IconType[] = [LuPenLine, FaInstagram, LuVideo, LuHandshake, LuCpu];

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

const linhaDestaque =
  "grupo grid grid-cols-[4.9rem_1fr] items-center gap-x-4 border-t-2 border-vinho/20 py-6 sm:grid-cols-[auto_6rem_1fr] sm:gap-x-6";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-nude focus:px-4 focus:py-2 focus:text-vinho"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <Animacoes />
      <RegistroVisita />

      <main id="conteudo" className="overflow-x-clip">
        {/* Hero */}
        <section id="inicio" className="fundo-vinho relative isolate overflow-hidden pt-[4.6rem] text-nude">
          <Forma className="-left-28 top-16 -z-10 size-[26rem] text-cereja/80" p={22} />
          <Forma className="-bottom-28 left-[28%] -z-10 size-80 text-ameixa" p={-16} />
          <span aria-hidden="true" className="reticula absolute left-[34%] top-24 -z-10 hidden size-44 text-rosa/45 md:block" />
          <div className="hero-foto borda-organica relative h-[52svh] min-h-[20rem] overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[54%]">
            <Image
              src={fotoPerfil}
              alt="Ana Julia de perfil, de blusa verde-oliva, registrando um evento com o celular"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[78%_35%] md:object-[70%_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vinho via-vinho/10 to-transparent md:bg-gradient-to-r md:via-vinho/20" />
          </div>

          {/* Selo giratório: leva para a próxima seção. */}
          <a
            href="#destaques"
            aria-label="Rolar para os destaques"
            className="entra absolute right-5 top-[calc(4.6rem+max(52svh,20rem)-5.5rem)] z-20 grid size-24 place-items-center rounded-full bg-rosa text-vinho md:bottom-10 md:right-8 md:top-auto md:size-28 lg:bottom-12 lg:left-[46%] lg:right-auto lg:size-32 lg:-translate-x-1/2"
            style={i(7)}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true" className="gira absolute inset-0 size-full">
              <defs>
                <path id="circulo-selo" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current text-[8.4px] font-semibold uppercase tracking-[0.12em]">
                <textPath href="#circulo-selo" textLength="236">
                  Marketing • Conteúdo • Comunicação • Pessoas •
                </textPath>
              </text>
            </svg>
            <LuArrowDown aria-hidden="true" className="flutua text-2xl md:text-3xl" />
          </a>

          <div className="wrap relative z-10 -mt-16 flex flex-col justify-end pb-10 md:mt-0 md:min-h-[min(calc(100svh-4.6rem),46rem)] md:pb-14 md:pt-20">
            <p className="entra marca text-rosa" style={i(0)}>
              Marketing &amp; Comunicação
            </p>
            <h1 className="display mt-4 text-[clamp(2.6rem,11vw,3.5rem)] md:text-[clamp(3.4rem,5.4vw,5.25rem)]">
              <span className="linha block">
                <span style={i(1)}>Estratégia.</span>
              </span>
              <span className="linha block !pb-[0.2em]">
                <span className="relative pl-[0.8em] italic text-rosa" style={i(2)}>
                  Conteúdo.
                  <Risco
                    tipo="sublinhado"
                    className="risco-hero absolute -bottom-[0.14em] left-[0.75em] w-[4.3em] text-pessego"
                  />
                </span>
              </span>
              <span className="linha block">
                <span style={i(3)}>Conexões.</span>
              </span>
            </h1>

            <p className="entra mt-6 max-w-[24rem] text-lg leading-snug" style={i(5)}>
              Marketing com propósito para aproximar pessoas e marcas.
            </p>

            <div className="entra mt-7 flex flex-wrap items-center gap-3" style={i(6)}>
              <a href="#atuacao" className="botao bg-rosa text-vinho">
                Conheça meu trabalho
                <LuArrowUpRight aria-hidden="true" className="text-lg" />
              </a>
              <a
                href="#contato"
                className="botao border-[1.5px] border-nude/60 text-nude hover:text-vinho"
              >
                <LuSend aria-hidden="true" className="text-base" />
                Fale comigo
              </a>
            </div>

            <ul className="entra mt-9 flex items-center gap-3" style={i(7)}>
              {canais.map(({ rotulo, href, Icone, externo }) => (
                <li key={rotulo}>
                  <a
                    href={href}
                    aria-label={rotulo}
                    {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
                    className="icone border-[1.5px] border-nude/40 hover:bg-nude hover:text-vinho"
                  >
                    <Icone aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="ml-2 flex items-center gap-2 text-sm text-nude/80">
                <LuMapPin aria-hidden="true" />
                {contato.cidade}
              </li>
            </ul>
          </div>
        </section>

        {/* Faixa em movimento */}
        <div className="faixa relative z-10 -my-4 -rotate-[1.3deg] scale-x-105 bg-rosa py-4 text-vinho shadow-xl shadow-chocolate/30" style={{ "--tempo": "36s" } as React.CSSProperties}>
          {[0, 1].map((copia) => (
            <ul key={copia} aria-hidden={copia === 1} className="faixa-trilho">
              {faixa.map(({ rotulo, Icone }) => (
                <li key={rotulo} className="flex items-center gap-3 whitespace-nowrap px-7">
                  <Icone aria-hidden="true" className="text-xl" />
                  <span className="font-display text-xl font-semibold italic">{rotulo}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Destaques */}
        <section id="destaques" className="fundo-papel overflow-clip pb-16 pt-24 md:pb-24 md:pt-32">
          <Forma className="-right-20 top-10 size-72 text-rosa/70" p={-18} />
          <span aria-hidden="true" className="reticula absolute bottom-6 left-[42%] size-48 text-vinho/30" />
          <div className="wrap grid gap-8 md:grid-cols-12 md:gap-10">
            <h2 className="sr-only">Destaques</h2>

            <div data-anima="escala" className="quadro-insta self-center md:col-span-5">
              <div className="quadro-insta-miolo fundo-cereja">
                <FaInstagram
                  aria-hidden="true"
                  className="absolute -right-12 -top-10 text-[10rem] text-nude/[0.05]"
                />
                <div aria-hidden="true" className="flex gap-1.5">
                  <span className="h-1 flex-1 rounded-full bg-nude/90" />
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-nude/25">
                    <span className="barra-story block h-full bg-nude/90" />
                  </span>
                  <span className="h-1 flex-1 rounded-full bg-nude/25" />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="anel-insta">
                    <span>
                      <FaInstagram aria-hidden="true" />
                    </span>
                  </span>
                  <span>
                    <span className="block font-semibold leading-tight">Instagram</span>
                    <span className="block text-sm leading-snug text-nude/75">
                      Conteúdo sobre o produto da empresa
                    </span>
                  </span>
                </div>

                <div className="relative mt-4 grid place-items-center py-10 text-center">
                  <span aria-hidden="true" className="pulso">
                    <span />
                    <span />
                    <span />
                  </span>
                  <p className="display relative text-rosa">
                    <span className="block text-[clamp(5.5rem,13vw,7.5rem)] leading-none">1</span>
                    <span className="-mt-1 block text-[clamp(2.5rem,5.4vw,3.6rem)] italic leading-none">
                      milhão
                    </span>
                  </p>
                </div>

                <p className="relative flex items-center justify-center gap-2 text-lg font-semibold">
                  <LuEye aria-hidden="true" className="text-xl text-rosa" />
                  de visualizações
                </p>
              </div>
            </div>

            <ul className="md:col-span-7 md:self-center">
              <li data-anima style={d(1)} className={linhaDestaque}>
                <span className="icone !hidden bg-vinho text-nude sm:!inline-grid">
                  <LuSmartphone aria-hidden="true" />
                </span>
                <span className="display text-5xl text-vinho sm:text-6xl">
                  <span data-conta="4">4</span>
                </span>
                <span>
                  <span className="block font-semibold">redes sob gestão</span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    {redes.map(({ nome, Icone }) => (
                      <span
                        key={nome}
                        className="flex items-center gap-1.5 rounded-full bg-vinho/10 px-3 py-1 text-sm font-medium text-vinho"
                      >
                        <Icone aria-hidden="true" />
                        {nome}
                      </span>
                    ))}
                  </span>
                </span>
              </li>
              <li data-anima style={d(2)} className={linhaDestaque}>
                <span className="icone !hidden bg-vinho text-nude sm:!inline-grid">
                  <LuUsers aria-hidden="true" />
                </span>
                <span className="display flex items-start text-5xl text-vinho sm:text-6xl">
                  <span data-conta="80">80</span>
                  <span className="mt-1 font-sans text-2xl font-bold">+</span>
                </span>
                <span>
                  <span className="block font-semibold">participantes na Convenção</span>
                  <span className="mt-1 block text-preto/75">
                    Cobertura em stories, em tempo real, como storymaker.
                  </span>
                </span>
              </li>
              <li data-anima style={d(3)} className={`${linhaDestaque} border-b-2`}>
                <span className="icone !hidden bg-vinho text-nude sm:!inline-grid">
                  <LuCalendarDays aria-hidden="true" />
                </span>
                <span className="display flex items-start text-5xl text-vinho sm:text-6xl">
                  <span data-conta="2">2</span>
                  <span className="mt-1 font-sans text-2xl font-bold">+</span>
                </span>
                <span>
                  <span className="block font-semibold">publicações por semana</span>
                  <span className="mt-1 block text-preto/75">
                    Frequência semanal nas redes sociais da empresa.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="fundo-rosa overflow-clip [--cortina:var(--color-rosa)] py-20 text-vinho md:py-28">
          <Rasgo cor="var(--color-nude)" semente={7} />
          <span aria-hidden="true" className="reticula absolute right-[6%] top-16 size-52 text-cereja/35" />
          <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-10">
            <div className="relative mx-auto w-[74%] max-w-xs md:col-span-4 md:col-start-2 md:mx-0 md:w-full md:max-w-none">
              <Forma className="-inset-x-[16%] -bottom-[6%] top-[10%] text-pessego/70" p={14} />
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-b-[1.25rem] rounded-t-full border-2 border-vinho"
              />
              <p className="absolute -right-4 -top-9 hidden -rotate-6 text-vinho sm:block md:-right-24">
                <Nota>Ana Julia, 20 anos</Nota>
                <Risco tipo="seta" className="absolute -left-4 top-6 w-14 -scale-x-100 rotate-[20deg]" />
              </p>
              <div
                data-anima="foto"
                className="foto deriva aspect-[3/4] !rounded-b-[1.25rem] !rounded-t-full"
              >
                <Image
                  src={fotoRetrato}
                  alt="Retrato de Ana Julia sorrindo, de óculos e cabelos cacheados, ao ar livre"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 74vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <p className="flutua absolute -left-6 bottom-8 flex items-center gap-2 rounded-full bg-vinho px-4 py-2.5 text-sm font-semibold text-nude shadow-lg shadow-vinho/30 sm:-left-10">
                <FaHandsAslInterpreting aria-hidden="true" className="text-lg text-rosa" />
                Fluente em Libras
              </p>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <h2 data-anima className="titulo">
                Mais do que{" "}
                <span className="relative inline-block italic">
                  <Risco tipo="pincelada" className="absolute -inset-x-[4%] bottom-[2%] -z-10 w-[108%] text-pessego/45" />
                  marketing,
                </span>{" "}
                pessoas.
              </h2>
              <div data-anima style={d(1)} className="mt-6 max-w-[34rem] space-y-4 text-preto">
                <p>
                  Ana Julia tem 20 anos e vive em Brusque, SC. Entrou na Intelidata como Jovem
                  Aprendiz no setor de marketing, foi efetivada e assumiu a gestão das redes
                  sociais da empresa.
                </p>
                <p>
                  Planeja, roteiriza, grava e edita. Cobre eventos em tempo real como storymaker e
                  já subiu ao palco para falar de comunicação multigeracional e de autocuidado.
                </p>
              </div>
              <ul data-anima style={d(2)} className="selos mt-7 flex flex-wrap gap-2.5 text-sm font-medium">
                <Selo Icone={LuMapPin}>Brusque, SC</Selo>
                <Selo Icone={LuGraduationCap}>Marketing na Univali</Selo>
                <Selo Icone={LuSend}>Freelancer em criação de conteúdo</Selo>
                <Selo Icone={LuPlane}>Disponível para viagens e eventos</Selo>
              </ul>
            </div>
          </div>
        </section>

        {/* Áreas de atuação */}
        <section id="atuacao" className="fundo-preto overflow-clip [--cortina:var(--color-preto)] py-20 text-nude lg:py-28">
          <Rasgo cor="var(--color-rosa)" semente={21} />
          <span aria-hidden="true" className="fantasma -right-[4%] top-10">
            story
          </span>
          <Forma className="-left-24 top-[38%] size-96 text-cereja/45" p={20} />
          <Forma className="right-[8%] bottom-24 size-56 text-ameixa/80" p={-14} />
          <div className="wrap">
            <h2 data-anima className="titulo">
              Do roteiro{" "}
              <span className="relative inline-block italic text-fumaca">
                ao story.
                <Risco tipo="sublinhado" className="absolute -bottom-[0.22em] left-0 w-full text-pessego" />
              </span>
            </h2>

            <div className="mt-10 grid gap-y-14 md:grid-cols-2 md:items-center md:gap-x-10 lg:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-y-0">
              <div className="colagem lg:col-span-7 lg:row-start-1" style={{ "--giro": "-1.8deg" } as React.CSSProperties}>
                <Fita className="-top-3 left-8 -rotate-6" />
                <Fita className="-top-2 right-10 rotate-[8deg]" />
                <Nota className="absolute -bottom-9 right-4 rotate-2 text-rosa">de olho no palco</Nota>
              <figure data-anima="foto" className="foto deriva aspect-[3/2]">
                <Image
                  src={fotoPlateia}
                  alt="Ana Julia sentada na plateia de um evento, gravando com o celular"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[35%_50%]"
                />
              </figure>
              </div>
              <Area
                className="mt-2 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:self-end"
                Icone={FaInstagram}
                titulo="Social Media"
                texto="Gestão de Instagram, LinkedIn, TikTok e YouTube: planejamento de conteúdo, publicações toda semana e análise de métricas e do crescimento dos perfis."
              />

              <div
                className="colagem lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-20"
                style={{ "--giro": "2.2deg" } as React.CSSProperties}
              >
                <Fita className="-top-3 left-1/2 -translate-x-1/2 rotate-3" />
                <Nota className="absolute -bottom-9 left-4 -rotate-2 text-rosa">registrando o telão</Nota>
              <figure data-anima="foto" className="foto deriva aspect-[4/3]">
                <Image
                  src={fotoTelao}
                  alt="Ana Julia filmando com o celular um telão iluminado em um evento"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[45%_50%]"
                />
              </figure>
              </div>
              <Area
                className="mt-2 lg:col-span-4 lg:col-start-2 lg:row-start-2 lg:mt-32 lg:self-start"
                Icone={LuClapperboard}
                titulo="Conteúdo Audiovisual"
                texto="Roteiros, captação e edição de vídeos institucionais, da montagem do cenário à maquiagem para a gravação."
              />

              <div
                className="colagem lg:col-span-4 lg:col-start-2 lg:row-start-3 lg:-mt-6"
                style={{ "--giro": "-2.6deg" } as React.CSSProperties}
              >
                <Fita className="-top-3 right-6 rotate-[10deg]" />
                <Fita className="-bottom-3 left-6 -rotate-[8deg]" />
                <Nota className="absolute -right-2 top-1/2 hidden rotate-90 text-rosa xl:block xl:-right-24">
                  gravando a palestra
                </Nota>
              <figure data-anima="foto" className="foto deriva aspect-[4/5]">
                <Image
                  src={fotoPalestra}
                  alt="Celular nas mãos de Ana Julia gravando uma palestra; na plateia, camisetas com a frase Conectados de Norte a Sul"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover object-[36%_50%]"
                />
              </figure>
              </div>
              <div className="mt-2 space-y-10 lg:col-span-5 lg:col-start-7 lg:row-start-3 lg:mt-24 lg:space-y-12">
                <Area
                  Icone={LuSmartphone}
                  titulo="Eventos & Storymaking"
                  texto="Stories em tempo real em convenções, visitas institucionais, palestras e confraternizações. Nos bastidores, orçamentos e contato com fornecedores."
                />
                <Area
                  Icone={LuMessagesSquare}
                  titulo="Comunicação"
                  texto="E-mail marketing e assinaturas institucionais via RD Station, comunicação institucional e palestras sobre comunicação multigeracional e autocuidado."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experiência */}
        <section id="experiencia" className="fundo-papel overflow-clip py-20 lg:py-28">
          <Rasgo cor="var(--color-preto)" semente={34} />
          <Forma className="-left-24 bottom-20 size-80 text-fumaca/60" p={16} />
          <span aria-hidden="true" className="reticula absolute right-[4%] top-24 size-56 text-vinho/25" />
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 data-anima className="titulo text-vinho lg:sticky lg:top-28">
                <span className="relative inline-block">
                  Experiência
                  <Risco tipo="estrela" className="absolute -right-9 -top-5 w-8 text-pessego" />
                </span>
              </h2>
            </div>

            <ol className="relative lg:col-span-8">
              <li aria-hidden="true" className="traco absolute bottom-0 left-[5px] top-2 w-0.5 bg-vinho/30" />

              {experiencias.map((e) => (
                <li key={e.periodo} data-anima className="relative pb-12 pl-9">
                  <span
                    aria-hidden="true"
                    className="pulsa absolute left-0 top-2 size-3 rounded-full bg-vinho"
                  />
                  <p className="text-sm font-semibold text-vinho">{e.periodo}</p>
                  <h3 className="display mt-1 text-2xl lg:text-3xl">{e.cargo}</h3>
                  <p className="mt-1 font-semibold text-vinho">
                    {e.empresa}
                    <span className="font-normal text-preto/70"> / {e.vinculo}</span>
                  </p>
                  <p className="mt-3 max-w-[40rem]">{e.resumo}</p>
                  {"pontos" in e && (
                    <ul className="mt-5 grid max-w-[46rem] gap-x-8 gap-y-3 text-[0.94rem] sm:grid-cols-2">
                      {e.pontos.map((p) => (
                        <li key={p} className="border-l-2 border-vinho/40 pl-3.5 leading-snug">
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {outrasExperiencias.map((e) => (
                <li key={e.cargo} data-anima className="relative pb-8 pl-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-[1px] top-2 size-2.5 rounded-full border-2 border-vinho bg-nude"
                  />
                  <p className="text-sm font-semibold text-vinho">{e.periodo}</p>
                  <h3 className="mt-0.5 font-semibold leading-snug">{e.cargo}</h3>
                  <p className="text-sm text-vinho">{e.empresa}</p>
                  <p className="mt-1.5 max-w-[40rem] text-[0.94rem] leading-snug text-preto/80">
                    {e.resumo}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Competências */}
        <section id="competencias" className="fundo-vinho overflow-clip py-20 text-nude md:py-28">
          <Rasgo cor="var(--color-nude)" semente={55} />
          <Forma className="-right-24 top-24 size-96 text-cereja/70" p={-20} />
          <span aria-hidden="true" className="reticula absolute left-[3%] top-1/2 size-52 text-rosa/30" />
          <div className="wrap">
            <h2 data-anima className="titulo">
              O que ela{" "}
              <span className="relative inline-block italic text-rosa">
                faz bem
                <Risco tipo="circulo" className="absolute -inset-x-[12%] -inset-y-[24%] h-[148%] w-[124%] text-pessego" />
              </span>
            </h2>

            <dl className="mt-10 md:mt-14">
              {competencias.map((c, n) => {
                const Icone = iconesCompetencias[n];
                return (
                  <div
                    key={c.area}
                    data-anima="esquerda"
                    style={d(n)}
                    className="grupo grid items-center gap-x-6 gap-y-2 border-t-2 border-nude/20 py-5 hover:bg-nude/[0.06] md:grid-cols-12 md:px-4"
                  >
                    <dt className="flex items-center gap-4 md:col-span-5">
                      <span className="icone bg-rosa text-vinho">
                        <Icone aria-hidden="true" />
                      </span>
                      <span className="display text-xl text-rosa md:text-2xl">{c.area}</span>
                    </dt>
                    <dd className="max-w-[40rem] text-nude/90 md:col-span-7">{c.itens}</dd>
                  </div>
                );
              })}
            </dl>

            <h3 data-anima className="mt-12 text-sm font-semibold text-fumaca md:mt-16">
              Ferramentas do dia a dia
            </h3>
          </div>

          <div className="faixa faixa-inversa mt-4" style={{ "--tempo": "40s" } as React.CSSProperties}>
            {[0, 1].map((copia) => (
              <ul key={copia} aria-hidden={copia === 1} className="faixa-trilho">
                {ferramentas.map((f) => (
                  <li key={f} className="flex items-center whitespace-nowrap">
                    <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold italic">
                      {f}
                    </span>
                    <span aria-hidden="true" className="px-6 text-2xl text-rosa">
                      ✦
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* Formação e diferenciais */}
        <section id="formacao" className="fundo-papel overflow-clip py-20 md:py-28">
          <Rasgo cor="var(--color-vinho)" semente={89} />
          <Forma className="left-[38%] top-10 size-64 text-rosa/60" p={18} />
          <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-6">
              <h2 data-anima className="titulo text-vinho">
                Formação
              </h2>
              <div data-anima style={d(1)} className="grupo mt-8 flex gap-4 border-t-2 border-vinho/20 pt-7">
                <span className="icone bg-vinho text-nude">
                  <LuGraduationCap aria-hidden="true" />
                </span>
                <div>
                  <h3 className="display text-2xl md:text-3xl">Tecnólogo em Marketing</h3>
                  <p className="mt-2 font-semibold text-vinho">Univali, Universidade do Vale do Itajaí</p>
                  <p className="text-preto/75">Previsão de conclusão: abril de 2027</p>
                </div>
              </div>

              <h3 data-anima className="mt-10 text-sm font-semibold text-vinho">
                Cursos e qualificações
              </h3>
              <ul className="mt-3">
                {cursos.map((c, n) => (
                  <li
                    key={c}
                    data-anima
                    style={d(n)}
                    className="flex items-start gap-3 border-t-2 border-vinho/20 py-3.5 leading-snug last:border-b-2"
                  >
                    <LuAward aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-vinho" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 md:col-start-8 md:pt-16">
              <div
                data-anima="escala"
                className="relative rotate-[1.6deg] overflow-hidden rounded-[3.4rem_2rem_3rem_2rem] fundo-ameixa px-7 py-9 text-nude shadow-2xl shadow-ameixa/40 sm:px-9 sm:py-11"
              >
                <FaHandsAslInterpreting
                  aria-hidden="true"
                  className="flutua absolute -right-4 -top-2 text-[9rem] text-rosa/15"
                />
                <span className="icone bg-rosa text-ameixa">
                  <FaHandsAslInterpreting aria-hidden="true" />
                </span>
                <p className="mt-6 text-sm font-semibold text-fumaca">Fluente em</p>
                <p className="display text-[clamp(3.2rem,8vw,5rem)] italic text-rosa">Libras</p>
                <p className="mt-3 max-w-[20rem] leading-snug">
                  Língua Brasileira de Sinais, com fluência.
                </p>
              </div>

              <dl data-anima style={d(1)} className="mt-8">
                <div className="flex items-center gap-3 border-t-2 border-vinho/20 py-4">
                  <LuLanguages aria-hidden="true" className="shrink-0 text-xl text-vinho" />
                  <dt className="font-semibold">Inglês</dt>
                  <dd className="ml-auto text-right text-preto/75">Básico / Intermediário</dd>
                </div>
                <div className="flex items-center gap-3 border-y-2 border-vinho/20 py-4">
                  <LuPlane aria-hidden="true" className="shrink-0 text-xl text-vinho" />
                  <dt className="font-semibold">Disponibilidade</dt>
                  <dd className="ml-auto text-right text-preto/75">Viagens e eventos</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="fundo-vinho overflow-clip pb-8 pt-20 text-nude lg:pt-28">
          <Rasgo cor="var(--color-nude)" semente={144} />
          <span aria-hidden="true" className="fantasma -left-[2%] bottom-24">
            olá
          </span>
          <Forma className="-right-28 top-1/3 size-[26rem] text-ameixa/80" p={18} />
          <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 data-anima className="display text-[clamp(2.4rem,5vw,4.2rem)] text-rosa">
                Vamos criar{" "}
                <span className="relative inline-block italic">
                  algo juntos?
                  <Risco tipo="sublinhado" className="absolute -bottom-[0.2em] left-0 w-full text-pessego" />
                </span>
              </h2>
              <p data-anima style={d(1)} className="mt-5 max-w-[24rem] text-nude/90">
                Preencha o formulário ou chame direto por um dos canais abaixo.
              </p>

              <ul className="mt-8 space-y-3">
                {canais.map(({ rotulo, valor, href, Icone, externo }, n) => (
                  <li key={rotulo} data-anima="esquerda" style={d(n + 2)}>
                    <a
                      href={href}
                      {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center gap-4 rounded-2xl border-[1.5px] border-nude/25 p-3 pr-5 transition-colors duration-300 hover:border-rosa hover:bg-nude/[0.06]"
                    >
                      <span className="icone bg-rosa text-vinho">
                        <Icone aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-fumaca">{rotulo}</span>
                        <span className="block break-all text-[0.9rem] font-semibold leading-snug sm:text-base">{valor}</span>
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
              className="papel relative rounded-[2rem_2.8rem_2rem_2.4rem] bg-creme p-6 text-preto shadow-2xl shadow-chocolate/50 sm:p-9 lg:col-span-7"
            >
              <Fita className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
              <Nota className="absolute -top-9 right-8 hidden rotate-3 text-rosa sm:block">vamos conversar?</Nota>
              <h3 className="display text-2xl text-vinho">Envie uma mensagem</h3>
              <p className="mb-6 mt-1 text-preto/75">Conte o que você tem em mente.</p>
              <FormContato />
            </div>
          </div>

          <footer className="wrap mt-16 flex flex-col gap-4 border-t-2 border-nude/20 pt-6 text-sm text-nude/80 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
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

function Area({
  Icone,
  titulo,
  texto,
  className = "",
}: {
  Icone: IconType;
  titulo: string;
  texto: string;
  className?: string;
}) {
  return (
    <div data-anima className={`grupo ${className}`}>
      <span className="icone bg-rosa text-vinho">
        <Icone aria-hidden="true" />
      </span>
      <h3 className="display mt-4 text-2xl text-rosa lg:text-3xl">{titulo}</h3>
      <p className="mt-2.5 max-w-[26rem] text-nude/85">{texto}</p>
    </div>
  );
}

function Selo({ Icone, children }: { Icone: IconType; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 rounded-full border-[1.5px] border-vinho/40 px-3.5 py-1.5">
      <Icone aria-hidden="true" className="text-base" />
      {children}
    </li>
  );
}
