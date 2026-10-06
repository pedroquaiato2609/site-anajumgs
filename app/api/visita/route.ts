import { NextResponse } from "next/server";
import { registrarVisita } from "@/lib/dados";
import { dentroDoLimite, idVisitante, ipDe } from "@/lib/sessao";

function dispositivo(agente: string) {
  if (/iPad|Tablet/i.test(agente)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(agente)) return "Celular";
  return "Computador";
}

function navegador(agente: string) {
  if (/Edg\//.test(agente)) return "Edge";
  if (/OPR\//.test(agente)) return "Opera";
  if (/SamsungBrowser/.test(agente)) return "Samsung Internet";
  if (/Instagram/.test(agente)) return "Instagram";
  if (/Chrome\//.test(agente)) return "Chrome";
  if (/Firefox\//.test(agente)) return "Firefox";
  if (/Safari\//.test(agente)) return "Safari";
  return "Outro";
}

function origem(referencia: unknown, hostProprio: string) {
  if (typeof referencia !== "string" || !referencia) return "Acesso direto";
  try {
    const host = new URL(referencia).hostname.replace(/^www\./, "");
    return host === hostProprio.replace(/^www\./, "").split(":")[0] ? "Acesso direto" : host.slice(0, 80);
  } catch {
    return "Acesso direto";
  }
}

export async function POST(request: Request) {
  const agente = request.headers.get("user-agent") ?? "";
  const ip = ipDe(request);

  if (/bot|crawl|spider|preview|headless/i.test(agente) || !dentroDoLimite(`visita:${ip}`, 30, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: true });
  }

  const corpo = await request.json().catch(() => ({}));
  await registrarVisita({
    em: new Date().toISOString(),
    visitante: idVisitante(ip, agente),
    dispositivo: dispositivo(agente),
    navegador: navegador(agente),
    origem: origem(corpo?.referencia, request.headers.get("host") ?? ""),
  });
  return NextResponse.json({ ok: true });
}
