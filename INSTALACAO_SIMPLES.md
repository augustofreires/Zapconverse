# 🚀 Instalação Simples - Zapconverse

## 📋 O que você vai precisar

- VPS Ubuntu 20.04/22.04
- Mínimo 2GB RAM
- Acesso SSH (root)

---

## ⚡ Instalação Rápida (1 comando)

### Copie e cole no terminal SSH:

```bash
wget https://raw.githubusercontent.com/augustofreires/Zapconverse/main/install.sh && chmod +x install.sh && sudo ./install.sh
```

**Pronto!** O script vai:
- ✅ Instalar todas as dependências (Node.js, PostgreSQL, Redis, PM2)
- ✅ Configurar o banco de dados
- ✅ Baixar e configurar o Zapconverse
- ✅ Iniciar os serviços automaticamente

⏱️ **Tempo estimado:** 10-15 minutos

---

## 📝 Durante a instalação

O script vai pedir:

1. **IP ou Domínio:** Digite o IP da sua VPS
2. **Senha PostgreSQL:** Crie uma senha forte
3. **Email Admin:** Seu email de acesso

**Exemplo:**
```
IP ou Domínio da VPS: 192.168.1.100
Senha do PostgreSQL: ********
Email do Admin: admin@meusite.com
```

---

## ✅ Após a instalação

### Acessar o sistema:
```
Frontend: http://SEU_IP:3001
Backend:  http://SEU_IP:3000
```

### Login inicial:
```
Email: admin@meusite.com
Senha: admin
```

⚠️ **Mude a senha imediatamente!**

---

## 🎨 Instalar aaPanel (Opcional - Para Customização)

Se você quiser editar arquivos visualmente (trocar logos, cores, textos):

```bash
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel
```

⏱️ Instalação: ~10 minutos

### Após instalação, anote:
- URL do painel (ex: http://SEU_IP:7800/xxxxx)
- Usuário
- Senha

---

## 🔧 Comandos Úteis

### Ver status dos serviços:
```bash
pm2 status
```

### Ver logs em tempo real:
```bash
pm2 logs
```

### Reiniciar serviços:
```bash
pm2 restart all
```

### Parar serviços:
```bash
pm2 stop all
```

---

## 📂 Localização dos Arquivos

### Backend:
```
/home/deploy/zapconverse/zapconverse/backend/
```

### Frontend:
```
/home/deploy/zapconverse/zapconverse/frontend/
```

### Arquivos de configuração:
```
Backend: /home/deploy/zapconverse/zapconverse/backend/.env
Frontend: /home/deploy/zapconverse/zapconverse/frontend/.env
```

---

## 🆘 Problemas?

### Backend não iniciou:
```bash
cd /home/deploy/zapconverse/zapconverse/backend
npm run build
pm2 restart zapconverse-backend
pm2 logs zapconverse-backend
```

### Frontend não carrega:
```bash
cd /home/deploy/zapconverse/zapconverse/frontend
npm run build
pm2 restart zapconverse-frontend
```

### Ver logs de erro:
```bash
pm2 logs --error
```

---

## 📞 Suporte

- **GitHub:** https://github.com/augustofreires/Zapconverse
- **Issues:** https://github.com/augustofreires/Zapconverse/issues

---

**🎉 Pronto! Seu Zapconverse está instalado e rodando!**
