"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuCheck, LuSend } from "react-icons/lu";
import { contato } from "@/lib/content";

const assuntos = [
  "Gestão de social media",
  "Conteúdo audiovisual",
  "Cobertura de evento",
  "Palestra",
  "Outro assunto",
];

type Campos = { nome: string; email: string; telefone: string; assunto: string; mensagem: string };
type Erros = Partial<Record<keyof Campos, string>>;

const vazio: Campos = { nome: "", email: "", telefone: "", assunto: assuntos[0], mensagem: "" };

function validar(c: Campos): Erros {
  const erros: Erros = {};
  if (!c.nome.trim()) erros.nome = "Informe seu nome.";
  if (!c.email.trim()) erros.email = "Informe seu e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim()))
    erros.email = "Confira o e-mail: falta algo como nome@exemplo.com.";
  if (!c.mensagem.trim()) erros.mensagem = "Escreva uma mensagem.";
  return erros;
}

export default function FormContato() {
  const [campos, setCampos] = useState<Campos>(vazio);
  const [armadilha, setArmadilha] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<"parado" | "enviando" | "enviado">("parado");
  const [falha, setFalha] = useState("");

  const mudar =
    (campo: keyof Campos) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setCampos((atual) => ({ ...atual, [campo]: e.target.value }));
      if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: undefined }));
    };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const encontrados = validar(campos);
    setErros(encontrados);
    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      document.getElementById(`campo-${primeiro}`)?.focus();
      return;
    }

    setEstado("enviando");
    setFalha("");
    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campos, site: armadilha }),
      });
      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => null);
        throw new Error(corpo?.erro ?? "Não foi possível enviar agora.");
      }
      setEstado("enviado");
    } catch (erro) {
      setEstado("parado");
      setFalha(
        erro instanceof Error && erro.message !== "Failed to fetch"
          ? erro.message
          : "Sem conexão com o servidor. Confira sua internet e tente de novo.",
      );
    }
  };

  if (estado === "enviado") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-5 py-6">
        <span className="icone bg-vinho text-rosa">
          <LuCheck aria-hidden="true" />
        </span>
        <h3 className="display text-3xl text-vinho">Mensagem enviada</h3>
        <p className="max-w-[26rem]">
          Obrigada, {campos.nome.trim().split(" ")[0]}! Recebi sua mensagem e respondo pelo e-mail
          informado.
        </p>
        <button
          type="button"
          className="elo font-semibold text-vinho"
          onClick={() => {
            setCampos(vazio);
            setEstado("parado");
          }}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={enviar} className="grid gap-5 sm:grid-cols-2">
      {/* Campo-armadilha contra robôs: fora da tela e fora da navegação por teclado. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="campo-site">Não preencha este campo</label>
        <input
          id="campo-site"
          name="site"
          tabIndex={-1}
          autoComplete="off"
          value={armadilha}
          onChange={(e) => setArmadilha(e.target.value)}
        />
      </div>

      <Campo id="nome" rotulo="Nome" erro={erros.nome}>
        <input
          id="campo-nome"
          className="campo"
          type="text"
          autoComplete="name"
          placeholder="Como você se chama?"
          value={campos.nome}
          onChange={mudar("nome")}
          aria-invalid={!!erros.nome}
          aria-describedby={erros.nome ? "erro-nome" : undefined}
          required
        />
      </Campo>

      <Campo id="email" rotulo="E-mail" erro={erros.email}>
        <input
          id="campo-email"
          className="campo"
          type="email"
          autoComplete="email"
          placeholder="nome@exemplo.com"
          value={campos.email}
          onChange={mudar("email")}
          aria-invalid={!!erros.email}
          aria-describedby={erros.email ? "erro-email" : undefined}
          required
        />
      </Campo>

      <Campo id="telefone" rotulo="Telefone" opcional>
        <input
          id="campo-telefone"
          className="campo"
          type="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          value={campos.telefone}
          onChange={mudar("telefone")}
        />
      </Campo>

      <Campo id="assunto" rotulo="Assunto">
        <select id="campo-assunto" className="campo" value={campos.assunto} onChange={mudar("assunto")}>
          {assuntos.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </Campo>

      <Campo id="mensagem" rotulo="Mensagem" erro={erros.mensagem} className="sm:col-span-2">
        <textarea
          id="campo-mensagem"
          className="campo min-h-32 resize-y"
          placeholder="Conte um pouco sobre o projeto ou a ideia."
          value={campos.mensagem}
          onChange={mudar("mensagem")}
          aria-invalid={!!erros.mensagem}
          aria-describedby={erros.mensagem ? "erro-mensagem" : undefined}
          required
        />
      </Campo>

      {falha && (
        <p role="alert" className="rounded-xl bg-[#b3261e]/10 px-4 py-3 text-sm font-medium text-[#b3261e] sm:col-span-2">
          {falha}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="botao bg-vinho text-nude hover:text-vinho disabled:opacity-60"
          style={{ "--botao-hover": "var(--color-rosa)" } as React.CSSProperties}
        >
          <LuSend aria-hidden="true" className="text-base" />
          {estado === "enviando" ? "Enviando…" : "Enviar mensagem"}
        </button>
        <a
          href={contato.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="botao border-[1.5px] border-vinho text-vinho hover:text-nude"
          style={{ "--botao-hover": "var(--color-vinho)" } as React.CSSProperties}
        >
          <FaWhatsapp aria-hidden="true" className="text-lg" />
          Chamar no WhatsApp
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
      <p className="text-sm text-preto/65 sm:col-span-2">
        Seus dados são usados somente para eu responder ao seu contato.
      </p>
    </form>
  );
}

function Campo({
  id,
  rotulo,
  erro,
  opcional,
  className = "",
  children,
}: {
  id: string;
  rotulo: string;
  erro?: string;
  opcional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`campo-${id}`} className="mb-1.5 block text-sm font-semibold text-vinho">
        {rotulo}
        {opcional && <span className="font-normal text-preto/55"> (opcional)</span>}
      </label>
      {children}
      {erro && (
        <p id={`erro-${id}`} className="mt-1.5 text-sm font-medium text-[#b3261e]">
          {erro}
        </p>
      )}
    </div>
  );
}
