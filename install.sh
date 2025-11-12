#!/bin/bash

##############################################
# Script de Instalação Automática
# Zapconverse - Sistema de Atendimento
##############################################

set -e  # Para em caso de erro

echo "======================================"
echo "  INSTALAÇÃO ZAPCONVERSE"
echo "======================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Verificar se é root ou sudo
if [ "$EUID" -ne 0 ]; then
    print_error "Execute como root ou com sudo"
    exit 1
fi

# Solicitar informações do usuário
echo ""
print_info "Por favor, forneça as seguintes informações:"
echo ""

read -p "IP ou Domínio da VPS: " SERVER_IP
read -p "Senha do PostgreSQL: " -s DB_PASSWORD
echo ""
read -p "Email do Admin: " ADMIN_EMAIL

# Gerar secrets
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

echo ""
print_info "Iniciando instalação..."
echo ""

# 1. Atualizar sistema
print_info "Atualizando sistema..."
apt update && apt upgrade -y
print_success "Sistema atualizado"

# 2. Instalar Node.js 20.x
print_info "Instalando Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
print_success "Node.js instalado: $(node -v)"

# 3. Instalar PM2
print_info "Instalando PM2..."
npm install -g pm2
print_success "PM2 instalado"

# 4. Instalar PostgreSQL
print_info "Instalando PostgreSQL..."
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
print_success "PostgreSQL instalado"

# 5. Instalar Redis
print_info "Instalando Redis..."
apt install -y redis-server
systemctl start redis
systemctl enable redis
print_success "Redis instalado"

# 6. Instalar Git
print_info "Instalando Git..."
apt install -y git
print_success "Git instalado"

# 7. Criar usuário deploy
print_info "Criando usuário deploy..."
if id "deploy" &>/dev/null; then
    print_info "Usuário deploy já existe"
else
    useradd -m -s /bin/bash deploy
    print_success "Usuário deploy criado"
fi

# 8. Configurar PostgreSQL
print_info "Configurando PostgreSQL..."
sudo -u postgres psql <<EOF
DROP DATABASE IF EXISTS zapconverse;
DROP USER IF EXISTS zapuser;
CREATE DATABASE zapconverse;
CREATE USER zapuser WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE zapconverse TO zapuser;
ALTER DATABASE zapconverse OWNER TO zapuser;
\q
EOF
print_success "PostgreSQL configurado"

# 9. Clonar projeto
print_info "Clonando projeto do GitHub..."
cd /home/deploy
if [ -d "zapconverse" ]; then
    print_info "Diretório já existe, atualizando..."
    cd zapconverse
    git pull origin main
else
    git clone https://github.com/augustofreires/Zapconverse.git zapconverse
fi
cd zapconverse
chown -R deploy:deploy /home/deploy/zapconverse
print_success "Projeto clonado"

# 10. Configurar Backend
print_info "Configurando backend..."
cd /home/deploy/zapconverse/zapconverse/backend

# Criar .env do backend
cat > .env <<EOF
NODE_ENV=production
BACKEND_URL=http://${SERVER_IP}:3000
FRONTEND_URL=http://${SERVER_IP}:3001
PORT=3000
PROXY_PORT=

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=zapuser
DB_PASS=${DB_PASSWORD}
DB_NAME=zapconverse

IO_REDIS_SERVER=localhost
IO_REDIS_PORT=6379
IO_REDIS_DB_SESSION=2

JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}

CHROME_BIN=/usr/bin/google-chrome-stable
ADMIN_DOMAIN=zapconverse.com
EOF

# Instalar dependências
sudo -u deploy npm install
print_success "Backend configurado"

# 11. Rodar migrations
print_info "Executando migrations..."
sudo -u deploy npx sequelize db:migrate
sudo -u deploy npx sequelize db:seed:all
print_success "Migrations executadas"

# 12. Build backend
print_info "Compilando backend..."
sudo -u deploy npm run build
print_success "Backend compilado"

# 13. Configurar Frontend
print_info "Configurando frontend..."
cd /home/deploy/zapconverse/zapconverse/frontend

# Criar .env do frontend
cat > .env <<EOF
REACT_APP_BACKEND_URL=http://${SERVER_IP}:3000
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
EOF

# Instalar dependências
sudo -u deploy npm install
print_success "Frontend configurado"

# 14. Build frontend
print_info "Compilando frontend (isso pode demorar alguns minutos)..."
sudo -u deploy npm run build
print_success "Frontend compilado"

# 15. Iniciar serviços com PM2
print_info "Iniciando serviços..."
cd /home/deploy/zapconverse/zapconverse/backend
sudo -u deploy pm2 start dist/server.js --name zapconverse-backend

cd /home/deploy/zapconverse/zapconverse/frontend
sudo -u deploy pm2 serve build 3001 --name zapconverse-frontend --spa

sudo -u deploy pm2 save
sudo -u deploy pm2 startup systemd -u deploy --hp /home/deploy
print_success "Serviços iniciados"

# 16. Configurar Firewall
print_info "Configurando firewall..."
ufw allow 22/tcp
ufw allow 3000/tcp
ufw allow 3001/tcp
echo "y" | ufw enable
print_success "Firewall configurado"

# Resumo final
echo ""
echo "======================================"
print_success "INSTALAÇÃO CONCLUÍDA!"
echo "======================================"
echo ""
echo "📋 INFORMAÇÕES DE ACESSO:"
echo ""
echo "Frontend: http://${SERVER_IP}:3001"
echo "Backend:  http://${SERVER_IP}:3000"
echo ""
echo "🔐 LOGIN INICIAL:"
echo "Email: ${ADMIN_EMAIL}"
echo "Senha: admin"
echo ""
echo "⚠️  IMPORTANTE: Altere a senha imediatamente após o primeiro login!"
echo ""
echo "📊 COMANDOS ÚTEIS:"
echo "Ver logs:      sudo -u deploy pm2 logs"
echo "Ver status:    sudo -u deploy pm2 status"
echo "Reiniciar:     sudo -u deploy pm2 restart all"
echo ""
echo "🎉 Seu Zapconverse está pronto para uso!"
echo ""
