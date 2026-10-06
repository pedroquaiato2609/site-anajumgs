import { NextResponse } from "next/server";
import {
  COOKIE_SESSAO,
  DURACAO_SESSAO,
  credenciaisConferem,
  criarSessao,
  dentroDoLimite,
  ipDe,
} from "@/lib/sessao";

export async function POST(request: Request) {
  const voltar = (erro?: string) =>
    NextResponse.redirect(new URL(erro ? `/admin?erro=${erro}` : "/admin", request.url), 303);

  if (!dentroDoLimite(`login:${ipDe(request)}`, 6, 10 * 60 * 1000)) return voltar("limite");

  const form = await request.formData();
  const usuario = String(form.get("usuario") ?? "");
  const senha = String(form.get("senha") ?? "");
  if (!credenciaisConferem(usuario, senha)) return voltar("credenciais");

  const resposta = voltar();
  resposta.cookies.set(COOKIE_SESSAO, criarSessao(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: DURACAO_SESSAO,
  });
  return resposta;
}
