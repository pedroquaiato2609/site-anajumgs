#!/usr/bin/env bash
# Publica a versão atual desta pasta no VPS. Rode no Git Bash, na raiz do projeto:
#   bash deploy/publicar.sh
# Envia os arquivos por SSH (não depende do GitHub), reconstrói a imagem e
# reinicia só o contêiner do site. Dados e credenciais do servidor são mantidos.
set -euo pipefail

SERVIDOR="${SERVIDOR:-root@177.153.20.189}"
PASTA="/opt/site-ana"

cd "$(dirname "$0")/.."

echo "==> Enviando arquivos"
ssh "$SERVIDOR" "mkdir -p $PASTA/dados && chown 1000:1000 $PASTA/dados"
git ls-files -co --exclude-standard -z | tar --null -T - -czf - | ssh "$SERVIDOR" "tar -xzf - -C $PASTA"

# As credenciais do painel sobem uma única vez, a partir do .env.local daqui.
if ! ssh "$SERVIDOR" "test -f $PASTA/.env"; then
  echo "==> Enviando credenciais do painel"
  scp -q .env.local "$SERVIDOR:$PASTA/.env"
  ssh "$SERVIDOR" "chmod 600 $PASTA/.env"
fi

echo "==> Construindo e reiniciando"
ssh "$SERVIDOR" "cd $PASTA && docker compose -f docker-compose.prod.yml up -d --build"
ssh "$SERVIDOR" "docker ps --filter name=site-ana --format '{{.Names}}: {{.Status}}'"
