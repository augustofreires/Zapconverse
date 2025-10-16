# 🚀 Guia Completo de Instalação - Zapconverse

## 📋 Pré-requisitos

### VPS Recomendada:
- **Sistema:** Ubuntu 20.04 ou 22.04 LTS
- **RAM:** Mínimo 2GB (Recomendado 4GB)
- **CPU:** 2 cores
- **Disco:** 20GB SSD
- **Provedor:** Contabo, DigitalOcean, AWS, Vultr, etc.

---

## 1️⃣ Preparar a VPS

### 1.1 Conectar via SSH
```bash
ssh root@SEU_IP_DA_VPS
```

### 1.2 Atualizar o sistema
```bash
apt update && apt upgrade -y
```

### 1.3 Criar usuário deploy (opcional mas recomendado)
```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

---

## 2️⃣ Instalar Dependências

### 2.1 Instalar Node.js 20.x
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # Verificar versão (deve ser 20.x)
npm -v   # Verificar npm
```

### 2.2 Instalar PM2 (Gerenciador de Processos)
```bash
sudo npm install -g pm2
pm2 startup systemd  # Seguir instruções
```

### 2.3 Instalar PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2.4 Instalar Redis
```bash
sudo apt install -y redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

### 2.5 Instalar Git
```bash
sudo apt install -y git
```

---

## 3️⃣ Configurar PostgreSQL

### 3.1 Criar banco de dados
```bash
sudo -u postgres psql

# Dentro do PostgreSQL:
CREATE DATABASE zapconverse;
CREATE USER zapuser WITH PASSWORD 'SUA_SENHA_FORTE';
GRANT ALL PRIVILEGES ON DATABASE zapconverse TO zapuser;
\q
```

### 3.2 Anotar credenciais:
- **Host:** localhost
- **Port:** 5432
- **Database:** zapconverse
- **User:** zapuser
- **Password:** [a senha que você criou]

---

## 4️⃣ Clonar o Projeto

### 4.1 Ir para pasta home
```bash
cd ~
```

### 4.2 Clonar do GitHub
```bash
git clone https://github.com/augustofreires/Zapconverse.git
cd Zapconverse/codatendechat-main
```

---

## 5️⃣ Configurar Backend

### 5.1 Ir para pasta do backend
```bash
cd ~/Zapconverse/codatendechat-main/backend
```

### 5.2 Instalar dependências
```bash
npm install
```

### 5.3 Criar arquivo .env
```bash
nano .env
```

### 5.4 Colar esta configuração:
```env
# Configurações do Backend
NODE_ENV=production
BACKEND_URL=http://SEU_IP:3000
FRONTEND_URL=http://SEU_IP:3001

# Porta do Backend
PORT=3000

# Proxy (deixar vazio se não usar)
PROXY_PORT=

# Database PostgreSQL
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=zapuser
DB_PASS=SUA_SENHA_FORTE
DB_NAME=zapconverse

# Redis
IO_REDIS_SERVER=localhost
IO_REDIS_PORT=6379
IO_REDIS_DB_SESSION=2

# JWT Secret (gerar uma chave forte)
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Chrome/Chromium para puppeteer
CHROME_BIN=/usr/bin/google-chrome-stable

# Usuário Admin Inicial
ADMIN_DOMAIN=zapconverse.com
```

**Salvar:** `Ctrl+O` → `Enter` → `Ctrl+X`

### 5.5 Rodar migrations
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 5.6 Iniciar backend com PM2
```bash
pm2 start dist/server.js --name zapconverse-backend
```

---

## 6️⃣ Configurar Frontend

### 6.1 Ir para pasta do frontend
```bash
cd ~/Zapconverse/codatendechat-main/frontend
```

### 6.2 Instalar dependências
```bash
npm install
```

### 6.3 Criar arquivo .env
```bash
nano .env
```

### 6.4 Colar esta configuração:
```env
REACT_APP_BACKEND_URL=http://SEU_IP:3000
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
```

**Salvar:** `Ctrl+O` → `Enter` → `Ctrl+X`

### 6.5 Fazer build do frontend
```bash
npm run build
```

### 6.6 Servir frontend com PM2
```bash
pm2 serve build 3001 --name zapconverse-frontend --spa
```

---

## 7️⃣ Configurar PM2 para Auto-start

### 7.1 Salvar processos do PM2
```bash
pm2 save
```

### 7.2 Verificar status
```bash
pm2 list
pm2 logs
```

---

## 8️⃣ Configurar Firewall (Opcional mas Recomendado)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 3000/tcp  # Backend
sudo ufw allow 3001/tcp  # Frontend
sudo ufw enable
sudo ufw status
```

---

## 9️⃣ Testar a Instalação

### 9.1 Acessar no navegador:
```
Frontend: http://SEU_IP:3001
Backend:  http://SEU_IP:3000
```

### 9.2 Login inicial:
- **Email:** admin@zapconverse.com
- **Senha:** admin

⚠️ **IMPORTANTE:** Troque a senha imediatamente!

---

## 🔧 Comandos Úteis

### Ver logs em tempo real:
```bash
pm2 logs
pm2 logs zapconverse-backend
pm2 logs zapconverse-frontend
```

### Reiniciar serviços:
```bash
pm2 restart all
pm2 restart zapconverse-backend
pm2 restart zapconverse-frontend
```

### Parar serviços:
```bash
pm2 stop all
pm2 stop zapconverse-backend
```

### Ver status:
```bash
pm2 status
pm2 monit
```

### Atualizar projeto do GitHub:
```bash
cd ~/Zapconverse
git pull origin main
cd codatendechat-main/frontend
npm run build
pm2 restart zapconverse-frontend
```

---

## 🌐 Configurar Domínio (Opcional)

### 10.1 Instalar Nginx
```bash
sudo apt install -y nginx
```

### 10.2 Criar configuração do site
```bash
sudo nano /etc/nginx/sites-available/zapconverse
```

### 10.3 Colar esta configuração:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 10.4 Ativar site
```bash
sudo ln -s /etc/nginx/sites-available/zapconverse /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 10.5 Instalar SSL (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

## 🆘 Troubleshooting

### Backend não inicia:
```bash
cd ~/Zapconverse/codatendechat-main/backend
npm run build
pm2 restart zapconverse-backend
pm2 logs zapconverse-backend
```

### Frontend não carrega:
```bash
cd ~/Zapconverse/codatendechat-main/frontend
npm run build
pm2 restart zapconverse-frontend
```

### Erro de banco de dados:
```bash
sudo -u postgres psql
\l  # Listar bancos
\c zapconverse  # Conectar no banco
\dt  # Listar tabelas
```

### Redis não conecta:
```bash
sudo systemctl status redis
redis-cli ping  # Deve retornar PONG
```

---

## 📞 Suporte

- **GitHub:** https://github.com/augustofreires/Zapconverse
- **Issues:** https://github.com/augustofreires/Zapconverse/issues

---

## ✅ Checklist Final

- [ ] Node.js 20.x instalado
- [ ] PostgreSQL configurado e rodando
- [ ] Redis configurado e rodando
- [ ] Projeto clonado do GitHub
- [ ] Backend com .env configurado
- [ ] Frontend com .env configurado
- [ ] Migrations executadas
- [ ] Backend rodando no PM2
- [ ] Frontend buildado e rodando
- [ ] Firewall configurado
- [ ] Acesso funcionando no navegador
- [ ] Senha do admin alterada

---

**🎉 Instalação Completa! Seu Zapconverse está pronto para uso!**
