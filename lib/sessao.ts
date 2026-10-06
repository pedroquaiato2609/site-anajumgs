import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

// Login do painel: um único usuário, definido em .env.local
// (ADMIN_USUARIO, ADMIN_SENHA e SESSAO_SEGREDO).

export const COOKIE_SESSAO = "painel_sessao";
export const DURACAO_SESSAO = 60 * 60 * 24 * 7; // 7 dias, em segundos

function segredo() {
  const valor = process.env.SESSAO_SEGREDO;
  if (!valor || valor.length < 32) throw new Error("Defina SESSAO_SEGREDO em .env.local");
  return valor;
}

const assinar = (corpo: string) => createHmac("sha256", segredo()).update(corpo).digest("hex");

function iguais(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function credenciaisConferem(usuario: string, senha: string) {
  const { ADMIN_USUARIO, ADMIN_SENHA } = process.env;
  if (!ADMIN_USUARIO || !ADMIN_SENHA) return false;
  // Compara os dois sempre, para o tempo de resposta não revelar qual errou.
  const usuarioOk = iguais(usuario, ADMIN_USUARIO);
  const senhaOk = iguais(senha, ADMIN_SENHA);
  return usuarioOk && senhaOk;
}

export function criarSessao() {
  const expira = String(Date.now() + DURACAO_SESSAO * 1000);
  return `${expira}.${assinar(expira)}`;
}

export function sessaoValida(token: string | undefined) {
  if (!token) return false;
  const [expira, assinatura] = token.split(".");
  if (!expira || !assinatura) return false;
  return iguais(assinatura, assinar(expira)) && Number(expira) > Date.now();
}

export async function logada() {
  return sessaoValida((await cookies()).get(COOKIE_SESSAO)?.value);
}

/** Identificador anônimo do visitante no dia: não guarda IP nem permite rastrear entre dias. */
export function idVisitante(ip: string, agente: string) {
  const dia = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${ip}|${agente}|${dia}|${segredo()}`).digest("hex").slice(0, 16);
}

export function ipDe(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

// Limite de tentativas em memória (zera quando o servidor reinicia).
const tentativas = new Map<string, number[]>();
export function dentroDoLimite(chave: string, maximo: number, janelaMs: number) {
  const agora = Date.now();
  const recentes = (tentativas.get(chave) ?? []).filter((t) => agora - t < janelaMs);
  if (recentes.length >= maximo) {
    tentativas.set(chave, recentes);
    return false;
  }
  recentes.push(agora);
  tentativas.set(chave, recentes);
  return true;
}
