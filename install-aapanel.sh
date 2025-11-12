#!/bin/bash

##############################################
# ZAPCONVERSE - Instalação Automática
# Com aaPanel para gerenciamento visual
##############################################

clear
echo "╔══════════════════════════════════════════╗"
echo "║     ZAPCONVERSE - Instalação Rápida     ║"
echo "║          Sistema de Atendimento          ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${CYAN}➜ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Verificar root
if [ "$EUID" -ne 0 ]; then
    print_error "Execute como root: sudo bash install-aapanel.sh"
    exit 1
fi

# Banner
echo -e "${PURPLE}════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Preparando instalação do Zapconverse...${NC}"
echo -e "${PURPLE}════════════════════════════════════════════${NC}"
echo ""

# Coletar informações
print_info "Por favor, forneça as seguintes informações:"
echo ""
read -p "$(echo -e ${BLUE}[1/4]${NC}) IP ou Domínio do servidor: " SERVER_IP
read -p "$(echo -e ${BLUE}[2/4]${NC}) Senha para o PostgreSQL: " -s DB_PASSWORD
echo ""
read -p "$(echo -e ${BLUE}[3/4]${NC}) Email do administrador: " ADMIN_EMAIL
read -p "$(echo -e ${BLUE}[4/4]${NC}) Instalar aaPanel? (s/n): " INSTALL_AAPANEL

echo ""
print_warning "Iniciando instalação... Isso pode levar alguns minutos."
echo ""

# Gerar secrets
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Atualizar sistema
print_info "[1/12] Atualizando sistema..."
apt update > /dev/null 2>&1 && apt upgrade -y > /dev/null 2>&1
print_success "Sistema atualizado"

# Instalar aaPanel (opcional)
if [ "$INSTALL_AAPANEL" == "s" ] || [ "$INSTALL_AAPANEL" == "S" ]; then
    print_info "[2/12] Instalando aaPanel (isso pode demorar ~10 min)..."
    wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh > /dev/null 2>&1
    echo "y" | bash install.sh aapanel > /tmp/aapanel_install.log 2>&1

    # Extrair credenciais do aaPanel
    AAPANEL_URL=$(grep -oP 'aaPanel Internet Address: \K.*' /tmp/aapanel_install.log | head -1)
    AAPANEL_USER=$(grep -oP 'username: \K.*' /tmp/aapanel_install.log | head -1)
    AAPANEL_PASS=$(grep -oP 'password: \K.*' /tmp/aapanel_install.log | head -1)

    print_success "aaPanel instalado"
else
    print_info "[2/12] Pulando instalação do aaPanel"
fi

# Node.js
print_info "[3/12] Instalando Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
apt install -y nodejs > /dev/null 2>&1
print_success "Node.js $(node -v) instalado"

# PM2
print_info "[4/12] Instalando PM2..."
npm install -g pm2 > /dev/null 2>&1
print_success "PM2 instalado"

# PostgreSQL
print_info "[5/12] Instalando PostgreSQL..."
apt install -y postgresql postgresql-contrib > /dev/null 2>&1
systemctl start postgresql
systemctl enable postgresql > /dev/null 2>&1
print_success "PostgreSQL instalado"

# Redis
print_info "[6/12] Instalando Redis..."
apt install -y redis-server > /dev/null 2>&1
systemctl start redis
systemctl enable redis > /dev/null 2>&1
print_success "Redis instalado"

# Git
print_info "[7/12] Instalando Git..."
apt install -y git > /dev/null 2>&1
print_success "Git instalado"

# Configurar PostgreSQL
print_info "[8/12] Configurando banco de dados..."
sudo -u postgres psql <<EOF > /dev/null 2>&1
DROP DATABASE IF EXISTS zapconverse;
DROP USER IF EXISTS zapuser;
CREATE DATABASE zapconverse;
CREATE USER zapuser WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE zapconverse TO zapuser;
ALTER DATABASE zapconverse OWNER TO zapuser;
EOF
print_success "Banco configurado"

# Clonar projeto
print_info "[9/12] Baixando Zapconverse..."
cd /www/wwwroot 2>/dev/null || cd /home
if [ -d "Zapconverse" ]; then
    rm -rf Zapconverse
fi
git clone https://github.com/augustofreires/Zapconverse.git > /dev/null 2>&1
cd Zapconverse/zapconverse
print_success "Projeto baixado"

# Backend
print_info "[10/12] Configurando backend..."
cd backend

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

npm install > /dev/null 2>&1
npx sequelize db:migrate > /dev/null 2>&1
npx sequelize db:seed:all > /dev/null 2>&1
npm run build > /dev/null 2>&1
print_success "Backend configurado"

# Frontend
print_info "[11/12] Configurando frontend..."
cd ../frontend

cat > .env <<EOF
REACT_APP_BACKEND_URL=http://${SERVER_IP}:3000
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
EOF

npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1
print_success "Frontend configurado"

# Iniciar serviços
print_info "[12/12] Iniciando serviços..."
cd ../backend
pm2 start dist/server.js --name zapconverse-backend > /dev/null 2>&1

cd ../frontend
pm2 serve build 3001 --name zapconverse-frontend --spa > /dev/null 2>&1

pm2 save > /dev/null 2>&1
pm2 startup systemd > /dev/null 2>&1

print_success "Serviços iniciados"

# Firewall
ufw allow 22/tcp > /dev/null 2>&1
ufw allow 3000/tcp > /dev/null 2>&1
ufw allow 3001/tcp > /dev/null 2>&1
ufw allow 7800/tcp > /dev/null 2>&1
echo "y" | ufw enable > /dev/null 2>&1

# Resumo final
clear
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                   ║${NC}"
echo -e "${GREEN}║        ✓ INSTALAÇÃO CONCLUÍDA COM SUCESSO!       ║${NC}"
echo -e "${GREEN}║                                                   ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${PURPLE}📱 ZAPCONVERSE - INFORMAÇÕES DE ACESSO${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🌐 Sistema:${NC}"
echo -e "   Frontend: ${GREEN}http://${SERVER_IP}:3001${NC}"
echo -e "   Backend:  ${GREEN}http://${SERVER_IP}:3000${NC}"
echo ""
echo -e "${BLUE}🔐 Login Inicial:${NC}"
echo -e "   Email: ${GREEN}${ADMIN_EMAIL}${NC}"
echo -e "   Senha: ${YELLOW}admin${NC} ${RED}(MUDE IMEDIATAMENTE!)${NC}"
echo ""

if [ ! -z "$AAPANEL_URL" ]; then
    echo -e "${BLUE}🎛️  aaPanel:${NC}"
    echo -e "   URL:     ${GREEN}${AAPANEL_URL}${NC}"
    echo -e "   Usuário: ${GREEN}${AAPANEL_USER}${NC}"
    echo -e "   Senha:   ${GREEN}${AAPANEL_PASS}${NC}"
    echo ""
fi

echo -e "${BLUE}📊 Comandos Úteis:${NC}"
echo -e "   Ver status:  ${CYAN}pm2 status${NC}"
echo -e "   Ver logs:    ${CYAN}pm2 logs${NC}"
echo -e "   Reiniciar:   ${CYAN}pm2 restart all${NC}"
echo -e "   Monitor:     ${CYAN}pm2 monit${NC}"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${PURPLE}💡 Dica: ${NC}Acesse o aaPanel para gerenciar tudo visualmente!"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}🎉 Seu Zapconverse está pronto para uso!${NC}"
echo ""
