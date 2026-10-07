#!/usr/bin/env bash
# Isola o site da Ana do kobushi/ninshiki, dando a ele IP, proxy e rede próprios.
# Roda NO SERVIDOR, como root, em duas etapas:
#
#   bash /opt/site-ana/deploy/isolar.sh preparar <IP_NOVO>
#       (depois: aponte o DNS de anajumgs.com.br e www para o IP novo e espere propagar)
#   bash /opt/site-ana/deploy/isolar.sh concluir
#
#   bash /opt/site-ana/deploy/isolar.sh status      mostra quem atende em cada IP
#
# Único ponto de contato com o kobushi: o Caddy dele hoje ocupa as portas 80/443
# em TODOS os IPs do servidor. A etapa "preparar" o restringe ao IP atual (variável
# BIND_IP, que o compose dele já suporta) e recria só esse contêiner, o que tira o
# kobushi do ar por alguns segundos. Nenhum arquivo do repositório dele é alterado.
set -euo pipefail

PASTA=/opt/site-ana
DOMINIO=anajumgs.com.br
CADDY_ANTIGO=ninshiki-prod-caddy-1
REDE_ANTIGA=ninshiki-prod_default
MARCA="# Site da Ana Julia"

cd "$PASTA"

confirmar() {
  local resposta
  read -r -p "$1 Digite 'sim' para continuar: " resposta
  [ "$resposta" = "sim" ] || { echo "Cancelado, nada foi alterado nesta etapa."; exit 1; }
}

definir_env() { # arquivo chave valor
  if grep -q "^$2=" "$1"; then sed -i "s|^$2=.*|$2=$3|" "$1"; else printf '\n%s=%s\n' "$2" "$3" >> "$1"; fi
}

rotulo() { docker inspect "$CADDY_ANTIGO" --format "{{ index .Config.Labels \"com.docker.compose.$1\" }}"; }

# Remove do texto do Caddyfile (stdin) o bloco do site da Ana: da linha de marca
# até a chave que fecha o bloco do "www".
sem_bloco_da_ana() {
  awk -v marca="$MARCA" '
    index($0, marca) == 1 { pulando = 1 }
    pulando {
      if ($0 ~ /redir https:\/\/anajumgs\.com\.br/) fim_proximo = 1
      else if (fim_proximo && $0 ~ /^}/) { pulando = 0; fim_proximo = 0 }
      next
    }
    { print }
  ' | sed -e :a -e '/^\n*$/{$d;N;ba' -e '}'
}

case "${1:-}" in
status)
  echo "IPs do servidor:"; ip -4 -o addr show scope global | awk '{print "  " $4 " (" $2 ")"}'
  echo "Portas 80/443:"
  docker ps --format '{{.Names}}\t{{.Ports}}' | grep -E ':(80|443)->' | sed 's/^/  /' || echo "  ninguém"
  echo "Redes do contêiner do site:"
  docker inspect site-ana --format '{{range $n, $_ := .NetworkSettings.Networks}}  {{$n}}{{"\n"}}{{end}}'
  ;;

preparar)
  IP_NOVO="${2:?Informe o IP novo: isolar.sh preparar <IP_NOVO>}"
  IP_ATUAL="$(ip -4 route get 1.1.1.1 | sed -n 's/.* src \([0-9.]*\).*/\1/p')"

  ip -4 -o addr show | grep -qw "$IP_NOVO" || {
    echo "O IP $IP_NOVO ainda não está configurado neste servidor."
    echo "Contrate/ative o IP adicional no painel da KingHost e confira com: ip -4 addr"
    exit 1
  }
  [ "$IP_NOVO" != "$IP_ATUAL" ] || { echo "O IP novo precisa ser diferente do atual ($IP_ATUAL)."; exit 1; }

  DIR="$(rotulo project.working_dir)"
  PROJETO="$(rotulo project)"
  ARQUIVOS="$(rotulo project.config_files)"
  ENVS="$(rotulo project.environment_file)"
  [ -n "$ENVS" ] || ENVS="$DIR/.env"
  ENV_PRINCIPAL="${ENVS%%,*}"
  [ -f "$ENV_PRINCIPAL" ] || { echo "Não achei o arquivo de ambiente do kobushi ($ENV_PRINCIPAL)."; exit 1; }

  ARGS=(-p "$PROJETO" --project-directory "$DIR")
  IFS=',' read -ra lista <<< "$ARQUIVOS"; for a in "${lista[@]}"; do ARGS+=(-f "$a"); done
  IFS=',' read -ra lista <<< "$ENVS"; for e in "${lista[@]}"; do ARGS+=(--env-file "$e"); done

  cat <<PLANO

O que será feito:
  1. kobushi: gravar BIND_IP=$IP_ATUAL em $ENV_PRINCIPAL (com cópia de segurança)
     e recriar SÓ o contêiner $CADDY_ANTIGO. O kobushi fica alguns segundos fora do ar.
  2. site da Ana: gravar BIND_IP=$IP_NOVO em $PASTA/.env e subir o site com o proxy
     próprio (site-ana-caddy) nesse IP, em rede separada.
  3. Manter o site também ligado à rede do kobushi, só até o DNS mudar, para o
     endereço atual continuar funcionando durante a troca.

PLANO
  confirmar "Isso mexe no kobushi em produção."

  echo "==> 1/3 Restringindo o Caddy do kobushi ao IP $IP_ATUAL"
  cp -p "$ENV_PRINCIPAL" "$ENV_PRINCIPAL.antes-isolar"
  definir_env "$ENV_PRINCIPAL" BIND_IP "$IP_ATUAL"
  docker compose "${ARGS[@]}" up -d --no-deps caddy
  docker port "$CADDY_ANTIGO" 80/tcp | grep -q "^$IP_ATUAL:" || {
    echo "O Caddy do kobushi não ficou só no IP $IP_ATUAL. Confira antes de seguir:"
    docker port "$CADDY_ANTIGO"
    exit 1
  }

  echo "==> 2/3 Subindo o site da Ana isolado no IP $IP_NOVO"
  definir_env "$PASTA/.env" BIND_IP "$IP_NOVO"
  docker compose -f docker-compose.prod.yml up -d --build

  echo "==> 3/3 Mantendo a rota antiga viva durante a troca de DNS"
  docker network connect "$REDE_ANTIGA" site-ana 2>/dev/null || true

  cat <<FIM

Pronto. Agora:
  1. No Registro.br, troque o endereço de $DOMINIO e de www para $IP_NOVO.
  2. Espere propagar (minutos a algumas horas). Não publique o site nesse intervalo.
  3. Rode: bash $PASTA/deploy/isolar.sh concluir
FIM
  ;;

concluir)
  IP_NOVO="$(sed -n 's/^BIND_IP=//p' "$PASTA/.env")"
  [ -n "$IP_NOVO" ] || { echo "Rode antes a etapa 'preparar'."; exit 1; }

  RESOLVIDO="$(getent ahostsv4 "$DOMINIO" | awk 'NR==1{print $1}')"
  [ "$RESOLVIDO" = "$IP_NOVO" ] || {
    echo "O DNS de $DOMINIO ainda aponta para ${RESOLVIDO:-nada}, não para $IP_NOVO. Espere propagar."
    exit 1
  }
  CODIGO="$(curl -s -o /dev/null -m 20 -w '%{http_code}' --resolve "$DOMINIO:443:$IP_NOVO" "https://$DOMINIO/" || true)"
  [ "$CODIGO" = "200" ] || {
    echo "O proxy novo ainda não responde com HTTPS válido em $IP_NOVO (resposta: $CODIGO)."
    echo "O certificado pode levar um ou dois minutos depois do DNS. Veja: docker logs --tail 30 site-ana-caddy"
    exit 1
  }

  ARQ="$(docker inspect "$CADDY_ANTIGO" --format '{{range .Mounts}}{{if eq .Destination "/etc/caddy/Caddyfile"}}{{.Source}}{{end}}{{end}}')"
  cat <<PLANO

O site já responde pelo IP novo. O que será feito:
  1. Desligar o contêiner do site da rede do kobushi.
  2. Tirar o bloco do $DOMINIO do Caddyfile do kobushi ($ARQ), com cópia de
     segurança e validação, e recarregar o Caddy dele (sem derrubar o kobushi).

PLANO
  confirmar "Esta etapa corta a última ligação entre os dois."

  docker network disconnect "$REDE_ANTIGA" site-ana 2>/dev/null || true

  if [ -n "$ARQ" ] && grep -q "$DOMINIO" "$ARQ"; then
    cp -p "$ARQ" "$ARQ.antes-isolar"
    NOVO="$(sem_bloco_da_ana < "$ARQ")"
    if printf '%s\n' "$NOVO" | grep -q "$DOMINIO"; then
      echo "Não consegui remover o bloco automaticamente; remova à mão em $ARQ."
      exit 1
    fi
    # Regrava o conteúdo no MESMO arquivo: ele é montado no contêiner pelo inode.
    printf '%s\n' "$NOVO" > "$ARQ"
    if docker exec "$CADDY_ANTIGO" caddy validate --config /etc/caddy/Caddyfile >/tmp/caddy-validate.log 2>&1; then
      docker exec "$CADDY_ANTIGO" caddy reload --config /etc/caddy/Caddyfile
    else
      tail -5 /tmp/caddy-validate.log
      cat "$ARQ.antes-isolar" > "$ARQ"
      echo "A validação falhou: Caddyfile do kobushi restaurado. O site da Ana já está isolado na rede; falta só tirar o bloco."
      exit 1
    fi
  fi

  cat <<FIM

Isolamento concluído: o site da Ana tem IP ($IP_NOVO), proxy, certificado e rede próprios.
Lembretes:
  - Mantenha BIND_IP no arquivo de ambiente do kobushi. Sem ele, o Caddy do kobushi
    volta a pedir as portas de todos os IPs e não consegue subir.
  - Se o bloco do $DOMINIO foi commitado no repositório do kobushi, remova-o lá também.
  - deploy/docker-compose.transicao.yml não é mais usado e pode ser apagado.
FIM
  ;;

*)
  sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
  ;;
esac
