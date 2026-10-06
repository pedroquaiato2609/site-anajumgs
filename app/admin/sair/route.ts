import { NextResponse } from "next/server";
import { COOKIE_SESSAO } from "@/lib/sessao";

export async function POST(request: Request) {
  const resposta = NextResponse.redirect(new URL("/admin", request.url), 303);
  resposta.cookies.set(COOKIE_SESSAO, "", { path: "/admin", maxAge: 0 });
  return resposta;
}
