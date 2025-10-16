# 🚀 Instalação Rápida - Zapconverse

## Método 1: Instalação Automática (Recomendado)

### Passo 1: Conectar na VPS
```bash
ssh root@SEU_IP_DA_VPS
```

### Passo 2: Baixar e executar script
```bash
wget https://raw.githubusercontent.com/augustofreires/Zapconverse/main/install.sh
chmod +x install.sh
./install.sh
```

### Passo 3: Seguir instruções na tela
O script irá solicitar:
- IP ou domínio da VPS
- Senha do PostgreSQL
- Email do administrador

### Passo 4: Acessar o sistema
```
Frontend: http://SEU_IP:3001
Login: admin@zapconverse.com
Senha: admin
```

⚠️ **Altere a senha imediatamente!**

---

## Método 2: Instalação Manual

📖 **Consulte o arquivo:** `GUIA_INSTALACAO_VPS.md`

---

## 🎯 Requisitos Mínimos

- **OS:** Ubuntu 20.04/22.04 LTS
- **RAM:** 2GB (4GB recomendado)
- **CPU:** 2 cores
- **Disco:** 20GB SSD
- **Portas:** 3000, 3001, 22

---

## 🔧 Comandos Úteis

### Ver status dos serviços
```bash
sudo -u deploy pm2 status
```

### Ver logs em tempo real
```bash
sudo -u deploy pm2 logs
```

### Reiniciar serviços
```bash
sudo -u deploy pm2 restart all
```

### Parar serviços
```bash
sudo -u deploy pm2 stop all
```

### Atualizar do GitHub
```bash
cd /home/deploy/zapconverse
git pull origin main
cd codatendechat-main/frontend
npm run build
sudo -u deploy pm2 restart zapconverse-frontend
```

---

## 🌐 Configurar Domínio

### Instalar Nginx
```bash
apt install -y nginx
```

### Criar configuração
```bash
nano /etc/nginx/sites-available/zapconverse
```

Cole:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

### Ativar
```bash
ln -s /etc/nginx/sites-available/zapconverse /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### SSL (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com
```

---

## 🆘 Problemas Comuns

### Porta 3001 não abre
```bash
sudo ufw allow 3001/tcp
```

### Backend não inicia
```bash
cd /home/deploy/zapconverse/codatendechat-main/backend
npm run build
sudo -u deploy pm2 restart zapconverse-backend
sudo -u deploy pm2 logs zapconverse-backend
```

### Frontend não carrega
```bash
cd /home/deploy/zapconverse/codatendechat-main/frontend
npm run build
sudo -u deploy pm2 restart zapconverse-frontend
```

### Erro de banco de dados
```bash
sudo -u postgres psql
\c zapconverse
\dt
```

---

## 📞 Suporte

- GitHub: https://github.com/augustofreires/Zapconverse
- Issues: https://github.com/augustofreires/Zapconverse/issues

---

## 📄 Documentação Completa

- `GUIA_INSTALACAO_VPS.md` - Guia passo a passo detalhado
- `install.sh` - Script de instalação automática

---

**🎉 Pronto! Sistema instalado e funcionando!**
