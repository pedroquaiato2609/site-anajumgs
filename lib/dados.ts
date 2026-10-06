import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

// Armazenamento simples em arquivos JSON na pasta dados/ (fora do git).
// Serve para rodar no computador ou em um servidor Node próprio. Em hospedagem
// serverless (Vercel, Netlify) o disco não é permanente: troque este módulo por
// um banco de dados antes de publicar lá.

const pasta = path.join(process.cwd(), "dados");
const LIMITE_VISITAS = 5000;

export type Mensagem = {
  id: string;
  criadaEm: string;
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  lida: boolean;
};

export type Visita = {
  em: string;
  visitante: string;
  dispositivo: string;
  navegador: string;
  origem: string;
};

async function ler<T>(arquivo: string): Promise<T[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(pasta, arquivo), "utf8")) as T[];
  } catch (erro) {
    if ((erro as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw erro;
  }
}

async function gravar<T>(arquivo: string, itens: T[]) {
  await fs.mkdir(pasta, { recursive: true });
  const destino = path.join(pasta, arquivo);
  const provisorio = `${destino}.${randomUUID()}.tmp`;
  await fs.writeFile(provisorio, JSON.stringify(itens, null, 1), "utf8");
  await fs.rename(provisorio, destino);
}

// Uma gravação por vez, para duas requisições simultâneas não se sobrescreverem.
let fila: Promise<unknown> = Promise.resolve();
function emFila<T>(tarefa: () => Promise<T>): Promise<T> {
  const resultado = fila.then(tarefa, tarefa);
  fila = resultado.catch(() => undefined);
  return resultado;
}

export function listarMensagens() {
  return ler<Mensagem>("mensagens.json");
}

export function salvarMensagem(dados: Omit<Mensagem, "id" | "criadaEm" | "lida">) {
  return emFila(async () => {
    const mensagens = await listarMensagens();
    mensagens.unshift({ id: randomUUID(), criadaEm: new Date().toISOString(), lida: false, ...dados });
    await gravar("mensagens.json", mensagens);
  });
}

export function marcarMensagem(id: string, lida: boolean) {
  return emFila(async () => {
    const mensagens = await listarMensagens();
    const alvo = mensagens.find((m) => m.id === id);
    if (!alvo) return;
    alvo.lida = lida;
    await gravar("mensagens.json", mensagens);
  });
}

export function excluirMensagem(id: string) {
  return emFila(async () => {
    const mensagens = await listarMensagens();
    const restantes = mensagens.filter((m) => m.id !== id);
    if (restantes.length !== mensagens.length) await gravar("mensagens.json", restantes);
  });
}

export function listarVisitas() {
  return ler<Visita>("visitas.json");
}

export function registrarVisita(visita: Visita) {
  return emFila(async () => {
    const visitas = await listarVisitas();
    visitas.unshift(visita);
    await gravar("visitas.json", visitas.slice(0, LIMITE_VISITAS));
  });
}
