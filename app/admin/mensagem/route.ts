import { NextResponse } from "next/server";
import { excluirMensagem, marcarMensagem } from "@/lib/dados";
import { logada } from "@/lib/sessao";

export async function POST(request: Request) {
  if (!(await logada())) return NextResponse.redirect(new URL("/admin", request.url), 303);

  const form = await request.formData();
  const id = String(form.get("id") ?? "");
  if (id && form.get("acao") === "excluir") await excluirMensagem(id);
  else if (id) await marcarMensagem(id, form.get("lida") === "1");
  return NextResponse.redirect(new URL("/admin#mensagens", request.url), 303);
}
