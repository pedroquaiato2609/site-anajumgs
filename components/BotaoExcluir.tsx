"use client";

import { LuTrash2 } from "react-icons/lu";

// Excluir é definitivo, então pede confirmação antes de enviar.
export default function BotaoExcluir({ id, nome }: { id: string; nome: string }) {
  return (
    <form
      action="/admin/mensagem"
      method="post"
      onSubmit={(e) => {
        if (!window.confirm(`Excluir a mensagem de ${nome}? Não dá para desfazer.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="acao" value="excluir" />
      <button type="submit" className="flex items-center gap-2 px-2 py-2 text-[#b3261e]/85 hover:text-[#b3261e]">
        <LuTrash2 aria-hidden="true" />
        Excluir
      </button>
    </form>
  );
}
