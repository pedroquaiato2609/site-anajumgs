"use client";

import { useEffect } from "react";

// Avisa o servidor de uma visita, uma vez por aba. Não usa cookies.
export default function RegistroVisita() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("visita-registrada")) return;
      sessionStorage.setItem("visita-registrada", "1");
    } catch {
      // sem sessionStorage (modo restrito): registra mesmo assim
    }
    fetch("/api/visita", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referencia: document.referrer }),
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}
