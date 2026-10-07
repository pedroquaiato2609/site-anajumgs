#!/usr/bin/env bash
# Roda NO SERVIDOR, uma única vez: liga o domínio anajumgs.com.br ao contêiner
# do site, acrescentando um bloco ao Caddyfile do projeto ninshiki.
# Faz cópia de segurança, valida antes de aplicar e desfaz sozinho se a validação falhar.
set -euo pipefail

ARQ=/opt/ninshiki/ops/caddy/Caddyfile
CADDY=ninshiki-prod-caddy-1

if grep -q "anajumgs.com.br" "$ARQ"; then
  echo "O bloco do domínio já existe no Caddyfile; nada a fazer."
  exit 0
fi

cp -p "$ARQ" "$ARQ.antes-site-ana"

# Acrescenta ao final SEM substituir o arquivo: ele é montado no contêiner pelo
# inode, então trocá-lo (sed -i, editores que regravam) faria o Caddy não ver a mudança.
cat >> "$ARQ" <<'BLOCO'

# Site da Ana Julia: contêiner "site-ana" (projeto em /opt/site-ana), ligado a esta rede.
anajumgs.com.br {
	encode zstd gzip

	header {
		Strict-Transport-Security "max-age=31536000"
		-Server
	}

	reverse_proxy site-ana:3000
}

www.anajumgs.com.br {
	redir https://anajumgs.com.br{uri} permanent
}
BLOCO

if docker exec "$CADDY" caddy validate --config /etc/caddy/Caddyfile >/tmp/caddy-validate.log 2>&1; then
  docker exec "$CADDY" caddy reload --config /etc/caddy/Caddyfile
  echo "Pronto: domínio ligado e Caddy recarregado (sem reiniciar o ninshiki)."
else
  tail -5 /tmp/caddy-validate.log
  cat "$ARQ.antes-site-ana" > "$ARQ"
  echo "A validação falhou: Caddyfile restaurado, nada foi recarregado."
  exit 1
fi
