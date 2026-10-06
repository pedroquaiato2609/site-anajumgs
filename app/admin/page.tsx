import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuCheck, LuEye, LuLock, LuLogOut, LuMail, LuMessagesSquare, LuUndo2, LuUsers } from "react-icons/lu";
import BotaoExcluir from "@/components/BotaoExcluir";
import { listarMensagens, listarVisitas, type Visita } from "@/lib/dados";
import { logada } from "@/lib/sessao";

export const metadata: Metadata = {
  title: "Painel | Ana Julia Magalhães",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const FUSO = "America/Sao_Paulo";
const dataHora = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: FUSO });
const diaCurto = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", timeZone: FUSO });
const diaChave = new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }); // AAAA-MM-DD

const erros: Record<string, string> = {
  credenciais: "Usuário ou senha incorretos.",
  limite: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
};

export default async function Admin({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (!(await logada())) return <Login erro={erros[(await searchParams).erro ?? ""]} />;

  const [mensagens, visitas] = await Promise.all([listarMensagens(), listarVisitas()]);
  const hoje = diaChave.format(new Date());
  const porDia = contarPorDia(visitas, 14);
  const maximo = Math.max(1, ...porDia.map((d) => d.total));
  const seteDias = porDia.slice(-7).reduce((soma, d) => soma + d.total, 0);
  const novas = mensagens.filter((m) => !m.lida).length;

  return (
    <div className="min-h-screen bg-creme text-preto">
      <header className="bg-vinho text-nude">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <p className="font-display text-lg font-semibold italic">Painel da Ana Julia</p>
          <div className="flex items-center gap-5 text-sm font-medium">
            <Link href="/" className="elo">
              Ver o site
            </Link>
            <form action="/admin/sair" method="post">
              <button type="submit" className="flex items-center gap-2 rounded-full border-[1.5px] border-nude/50 px-4 py-2 hover:bg-nude hover:text-vinho">
                <LuLogOut aria-hidden="true" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="wrap space-y-10 py-10">
        <section aria-label="Resumo" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Resumo Icone={LuEye} rotulo="Visitas hoje" valor={porDia.at(-1)?.total ?? 0} />
          <Resumo Icone={LuEye} rotulo="Visitas em 7 dias" valor={seteDias} />
          <Resumo
            Icone={LuUsers}
            rotulo="Visitantes hoje"
            valor={new Set(visitas.filter((v) => diaChave.format(new Date(v.em)) === hoje).map((v) => v.visitante)).size}
          />
          <Resumo Icone={LuMessagesSquare} rotulo="Mensagens novas" valor={novas} destaque={novas > 0} />
        </section>

        <section aria-labelledby="t-grafico" className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h2 id="t-grafico" className="font-display text-xl font-semibold text-vinho">
            Visitas nos últimos 14 dias
          </h2>
          <ol className="mt-6 flex h-44 items-end gap-1.5 sm:gap-2.5">
            {porDia.map((d) => (
              <li key={d.chave} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-xs font-semibold text-vinho">{d.total || ""}</span>
                <span
                  className="w-full rounded-t-md bg-vinho/85"
                  style={{ height: `${Math.max(d.total ? 6 : 1, (d.total / maximo) * 100)}%` }}
                />
                <span className="text-[0.65rem] text-preto/60 sm:text-xs">{d.rotulo}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="mensagens" aria-labelledby="t-mensagens" className="scroll-mt-6">
          <h2 id="t-mensagens" className="font-display text-xl font-semibold text-vinho">
            Mensagens recebidas ({mensagens.length})
          </h2>
          {mensagens.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-white p-7 text-preto/70 shadow-sm">
              Nenhuma mensagem ainda. Quando alguém enviar o formulário do site, ela aparece aqui.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {mensagens.map((m) => (
                <li
                  key={m.id}
                  className={`rounded-2xl bg-white p-5 shadow-sm sm:p-6 ${m.lida ? "" : "border-l-4 border-pessego"}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold">
                      {m.nome}
                      {!m.lida && (
                        <span className="ml-2 rounded-full bg-pessego px-2 py-0.5 text-xs font-semibold text-white">
                          nova
                        </span>
                      )}
                    </h3>
                    <time dateTime={m.criadaEm} className="text-sm text-preto/60">
                      {dataHora.format(new Date(m.criadaEm))}
                    </time>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-vinho">{m.assunto}</p>
                  <p className="mt-3 whitespace-pre-wrap break-words">{m.mensagem}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium">
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-2 rounded-full bg-vinho/10 px-3.5 py-2 text-vinho hover:bg-vinho/20"
                    >
                      <LuMail aria-hidden="true" />
                      {m.email}
                    </a>
                    {m.telefone && (
                      <a
                        href={`https://wa.me/55${m.telefone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-vinho/10 px-3.5 py-2 text-vinho hover:bg-vinho/20"
                      >
                        <FaWhatsapp aria-hidden="true" />
                        {m.telefone}
                      </a>
                    )}
                    <form action="/admin/mensagem" method="post" className="ml-auto">
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="lida" value={m.lida ? "0" : "1"} />
                      <button type="submit" className="flex items-center gap-2 px-2 py-2 text-preto/70 hover:text-vinho">
                        {m.lida ? <LuUndo2 aria-hidden="true" /> : <LuCheck aria-hidden="true" />}
                        {m.lida ? "Marcar como não lida" : "Marcar como lida"}
                      </button>
                    </form>
                    <BotaoExcluir id={m.id} nome={m.nome} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="t-visitas">
          <h2 id="t-visitas" className="font-display text-xl font-semibold text-vinho">
            Últimas visitas
          </h2>
          <p className="mt-1 text-sm text-preto/65">
            O site não sabe o nome de quem visita: registra quando foi, de que aparelho e de onde a
            pessoa veio. Total registrado: {visitas.length}.
          </p>
          {visitas.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-white p-7 text-preto/70 shadow-sm">Nenhuma visita registrada ainda.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="border-b-2 border-vinho/15 text-vinho">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Quando</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Aparelho</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Navegador</th>
                    <th scope="col" className="px-5 py-3 font-semibold">De onde veio</th>
                  </tr>
                </thead>
                <tbody>
                  {visitas.slice(0, 60).map((v, n) => (
                    <tr key={`${v.em}-${n}`} className="border-b border-vinho/10 last:border-0">
                      <td className="whitespace-nowrap px-5 py-2.5">{dataHora.format(new Date(v.em))}</td>
                      <td className="px-5 py-2.5">{v.dispositivo}</td>
                      <td className="px-5 py-2.5">{v.navegador}</td>
                      <td className="px-5 py-2.5">{v.origem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function contarPorDia(visitas: Visita[], dias: number) {
  const totais = new Map<string, number>();
  for (const v of visitas) {
    const chave = diaChave.format(new Date(v.em));
    totais.set(chave, (totais.get(chave) ?? 0) + 1);
  }
  return Array.from({ length: dias }, (_, n) => {
    const data = new Date(Date.now() - (dias - 1 - n) * 86_400_000);
    const chave = diaChave.format(data);
    return { chave, rotulo: diaCurto.format(data), total: totais.get(chave) ?? 0 };
  });
}

function Resumo({
  Icone,
  rotulo,
  valor,
  destaque,
}: {
  Icone: typeof LuEye;
  rotulo: string;
  valor: number;
  destaque?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm ${destaque ? "bg-vinho text-nude" : "bg-white"}`}>
      <Icone aria-hidden="true" className={`text-xl ${destaque ? "text-rosa" : "text-vinho"}`} />
      <p className="mt-3 font-display text-4xl font-semibold leading-none">{valor}</p>
      <p className={`mt-1.5 text-sm ${destaque ? "text-nude/85" : "text-preto/65"}`}>{rotulo}</p>
    </div>
  );
}

function Login({ erro }: { erro?: string }) {
  return (
    <main className="fundo-vinho grid min-h-screen place-items-center px-5 py-10 text-preto">
      <form action="/admin/entrar" method="post" className="w-full max-w-sm rounded-3xl bg-creme p-7 shadow-2xl sm:p-9">
        <span className="icone bg-vinho text-rosa">
          <LuLock aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-vinho">Painel da Ana Julia</h1>
        <p className="mt-1 text-sm text-preto/70">Entre para ver as visitas e as mensagens do site.</p>

        {erro && (
          <p role="alert" className="mt-5 rounded-xl bg-[#b3261e]/10 px-4 py-3 text-sm font-medium text-[#b3261e]">
            {erro}
          </p>
        )}

        <label htmlFor="usuario" className="mb-1.5 mt-6 block text-sm font-semibold text-vinho">
          Usuário
        </label>
        <input id="usuario" name="usuario" className="campo" autoComplete="username" autoCapitalize="none" required />

        <label htmlFor="senha" className="mb-1.5 mt-4 block text-sm font-semibold text-vinho">
          Senha
        </label>
        <input id="senha" name="senha" type="password" className="campo" autoComplete="current-password" required />

        <button
          type="submit"
          className="botao mt-7 w-full bg-vinho text-nude hover:text-vinho"
          style={{ "--botao-hover": "var(--color-rosa)" } as React.CSSProperties}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
