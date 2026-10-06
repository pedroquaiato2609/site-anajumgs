import { NextResponse } from "next/server";
import { salvarMensagem } from "@/lib/dados";
import { dentroDoLimite, ipDe } from "@/lib/sessao";

const texto = (valor: unknown, maximo: number) =>
  typeof valor === "string" ? valor.trim().slice(0, maximo) : "";

export async function POST(request: Request) {
  if (!dentroDoLimite(`contato:${ipDe(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { erro: "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos." },
      { status: 429 },
    );
  }

  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  // Campo-armadilha: pessoas não o veem; robôs costumam preencher.
  if (texto(corpo.site, 200)) return NextResponse.json({ ok: true });

  const dados = {
    nome: texto(corpo.nome, 120),
    email: texto(corpo.email, 160),
    telefone: texto(corpo.telefone, 40),
    assunto: texto(corpo.assunto, 80),
    mensagem: texto(corpo.mensagem, 4000),
  };

  if (!dados.nome || !dados.mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    return NextResponse.json({ erro: "Preencha nome, e-mail válido e mensagem." }, { status: 400 });
  }

  await salvarMensagem(dados);
  return NextResponse.json({ ok: true });
}
