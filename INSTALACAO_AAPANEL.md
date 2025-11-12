# 🚀 Guia de Instalação com aaPanel - Zapconverse

## 📋 O que você vai precisar

- Uma VPS (Contabo, DigitalOcean, AWS, etc.)
- Ubuntu 20.04 ou 22.04
- Mínimo 2GB RAM (recomendado 4GB)
- Acesso SSH (root)

---

## 1️⃣ Preparar o Servidor

### 1.1 Conectar via SSH
```bash
ssh root@SEU_IP_VPS
```

### 1.2 Atualizar o sistema
```bash
apt update && apt upgrade -y
```

---

## 2️⃣ Instalar aaPanel

### 2.1 Executar instalador
```bash
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && bash install.sh aapanel
```

⏳ **Aguarde:** A instalação leva cerca de 5-10 minutos.

### 2.2 Salvar credenciais
Ao final, você verá algo como:
```
==================================================================
Congratulations! Installed successfully!
==================================================================
aaPanel Internet Address: http://SEU_IP:7800/abcd1234
aaPanel Internal Address: http://localhost:7800/abcd1234
username: vhj9sltk
password: 2f7e8d9c
==================================================================
```

⚠️ **IMPORTANTE:** Anote o endereço, usuário e senha!

### 2.3 Acessar aaPanel
Abra no navegador: `http://SEU_IP:7800/abcd1234` (use o seu endereço)

---

## 3️⃣ Configurar Software no aaPanel

### 3.1 Instalar pacotes necessários

Após login no aaPanel, vá em **App Store** e instale:

1. **Nginx** 1.24.x
2. **PostgreSQL** 14.x ou 15.x
3. **Redis** 7.x
4. **PM2** Manager (se disponível) OU Node.js

Clique em **Install** em cada um e aguarde finalizar.

---

## 4️⃣ Configurar PostgreSQL

### 4.1 No aaPanel, vá em **Database** → **PostgreSQL**

### 4.2 Criar banco de dados
- Clique em **Add Database**
- **Database Name:** zapconverse
- **Username:** zapuser
- **Password:** [escolha uma senha forte]
- **Access:** localhost
- Clique em **Submit**

### 4.3 Anotar credenciais
```
Host: localhost
Port: 5432
Database: zapconverse
User: zapuser
Password: [sua senha]
```

---

## 5️⃣ Instalar Node.js e PM2 (se necessário)

### 5.1 Abrir Terminal do aaPanel
No menu lateral, clique em **Terminal**

### 5.2 Instalar Node.js 20.x
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v  # Verificar versão
```

### 5.3 Instalar PM2
```bash
npm install -g pm2
pm2 startup systemd
```

---

## 6️⃣ Clonar o Projeto

### 6.1 No Terminal do aaPanel:
```bash
cd /www/wwwroot
git clone https://github.com/augustofreires/Zapconverse.git
cd Zapconverse/zapconverse
```

---

## 7️⃣ Configurar Backend

### 7.1 Ir para pasta backend
```bash
cd /www/wwwroot/Zapconverse/zapconverse/backend
```

### 7.2 Criar arquivo .env

**Opção A: Via Terminal**
```bash
nano .env
```

**Opção B: Via File Manager do aaPanel**
1. Vá em **Files**
2. Navegue até `/www/wwwroot/Zapconverse/zapconverse/backend`
3. Clique em **New File** → `.env`
4. Edite o arquivo

### 7.3 Colar esta configuração:
```env
NODE_ENV=production
BACKEND_URL=http://SEU_IP:3000
FRONTEND_URL=http://SEU_IP:3001

PORT=3000
PROXY_PORT=

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=zapuser
DB_PASS=SUA_SENHA_DO_POSTGRES
DB_NAME=zapconverse

IO_REDIS_SERVER=localhost
IO_REDIS_PORT=6379
IO_REDIS_DB_SESSION=2

JWT_SECRET=gere_uma_chave_aleatoria_aqui
JWT_REFRESH_SECRET=gere_outra_chave_aleatoria_aqui

CHROME_BIN=/usr/bin/google-chrome-stable
ADMIN_DOMAIN=zapconverse.com
```

**Gerar secrets JWT:**
```bash
# No terminal, execute:
echo "JWT_SECRET=$(openssl rand -base64 32)"
echo "JWT_REFRESH_SECRET=$(openssl rand -base64 32)"
```
Copie os valores gerados e cole no .env

### 7.4 Instalar dependências
```bash
npm install
```

### 7.5 Rodar migrations
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 7.6 Build do backend
```bash
npm run build
```

### 7.7 Iniciar backend com PM2
```bash
pm2 start dist/server.js --name zapconverse-backend
pm2 save
```

---

## 8️⃣ Configurar Frontend

### 8.1 Ir para pasta frontend
```bash
cd /www/wwwroot/Zapconverse/zapconverse/frontend
```

### 8.2 Criar arquivo .env
```bash
nano .env
```

Ou use o File Manager do aaPanel.

### 8.3 Colar esta configuração:
```env
REACT_APP_BACKEND_URL=http://SEU_IP:3000
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
```

### 8.4 Instalar dependências
```bash
npm install
```

### 8.5 Build do frontend
```bash
npm run build
```

### 8.6 Servir frontend com PM2
```bash
pm2 serve build 3001 --name zapconverse-frontend --spa
pm2 save
```

---

## 9️⃣ Configurar Firewall no aaPanel

### 9.1 Vá em **Security**

### 9.2 Adicionar regras:
- Porta **3000** (Backend)
- Porta **3001** (Frontend)
- Porta **7800** (aaPanel) - já deve estar aberta

---

## 🔟 Configurar Nginx como Proxy (Opcional)

### 10.1 No aaPanel, vá em **Website**

### 10.2 Adicionar site
- Clique em **Add site**
- **Domain:** seu-dominio.com (ou deixe em branco por enquanto)
- **Root directory:** `/www/wwwroot/Zapconverse/zapconverse/frontend/build`
- Clique em **Submit**

### 10.3 Configurar Proxy Reverso
1. Clique no site criado → **Settings**
2. Vá em **Reverse Proxy**
3. Clique em **Add Reverse Proxy**

**Para Frontend:**
- Target URL: `http://localhost:3001`
- Cache: Desabilitar
- Send domain: $host

**Para Backend (criar outro):**
- Path: `/api`
- Target URL: `http://localhost:3000`

---

## ✅ Testar Instalação

### Acessar no navegador:
```
Frontend: http://SEU_IP:3001
Backend:  http://SEU_IP:3000
```

### Login inicial:
```
Email: admin@zapconverse.com
Senha: admin
```

⚠️ **Mude a senha imediatamente!**

---

## 🔧 Gerenciar com aaPanel

### Ver processos PM2:
No terminal do aaPanel:
```bash
pm2 list
pm2 logs
pm2 monit
```

### Reiniciar serviços:
```bash
pm2 restart zapconverse-backend
pm2 restart zapconverse-frontend
```

### Ver logs:
```bash
pm2 logs zapconverse-backend
pm2 logs zapconverse-frontend
```

---

## 📊 Monitoramento no aaPanel

1. **Dashboard:** Veja CPU, RAM, disco em tempo real
2. **Files:** Gerencie arquivos visualmente
3. **Database:** Acesse PostgreSQL via phpPgAdmin
4. **Security:** Configure firewall e SSL
5. **Cron:** Agende tarefas (backups, etc.)

---

## 🔐 Configurar SSL (Let's Encrypt)

### No aaPanel:
1. Vá em **Website** → Seu site
2. Clique em **SSL**
3. Selecione **Let's Encrypt**
4. Digite seu domínio
5. Clique em **Apply**

---

## 🆘 Troubleshooting

### Backend não inicia:
```bash
cd /www/wwwroot/Zapconverse/zapconverse/backend
npm run build
pm2 restart zapconverse-backend
pm2 logs zapconverse-backend
```

### Frontend não carrega:
```bash
cd /www/wwwroot/Zapconverse/zapconverse/frontend
npm run build
pm2 restart zapconverse-frontend
```

### Erro de banco:
No aaPanel → **Database** → **PostgreSQL** → Verifique se o banco existe

### Redis não conecta:
No terminal:
```bash
redis-cli ping  # Deve retornar PONG
systemctl status redis
```

---

## 📝 Comandos Úteis

### Atualizar projeto:
```bash
cd /www/wwwroot/Zapconverse
git pull origin main
cd zapconverse/backend
npm install
npm run build
pm2 restart zapconverse-backend

cd ../frontend
npm install
npm run build
pm2 restart zapconverse-frontend
```

### Ver status de tudo:
```bash
pm2 status
systemctl status postgresql
systemctl status redis
systemctl status nginx
```

---

## 🎉 Pronto!

Seu Zapconverse está rodando com aaPanel!

**Vantagens do aaPanel:**
- ✅ Interface gráfica amigável
- ✅ Gerenciamento visual de arquivos
- ✅ Monitoramento em tempo real
- ✅ SSL automático
- ✅ Backups fáceis
- ✅ Firewall integrado

---

## 📞 Suporte

- **GitHub:** https://github.com/augustofreires/Zapconverse
- **Issues:** https://github.com/augustofreires/Zapconverse/issues

**Boa sorte! 🚀**
