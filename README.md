# 🚀 Zapconverse

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-green.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-14%2B-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Sistema Completo de Atendimento Multi-Atendentes com WhatsApp**

[Features](#-features) • [Demo](#-demo) • [Instalação](#-instalação) • [Documentação](#-documentação) • [Suporte](#-suporte)

</div>

---

## 📋 Sobre o Projeto

**Zapconverse** é um sistema profissional de atendimento ao cliente com integração ao WhatsApp, desenvolvido para empresas que buscam organizar e escalar seu atendimento de forma eficiente.

### 💼 Ideal para:
- Empresas de suporte técnico
- E-commerce
- Prestadores de serviço
- Agências de marketing
- Qualquer negócio que atenda clientes via WhatsApp

---

## ✨ Features

### 🎯 Atendimento
- ✅ **Multi-atendentes** - Vários atendentes simultâneos
- ✅ **Filas de atendimento** - Organize por departamentos
- ✅ **Tags e categorias** - Classifique seus atendimentos
- ✅ **Notas internas** - Comunicação entre equipe
- ✅ **Transferência de tickets** - Entre atendentes
- ✅ **Histórico completo** - Nunca perca o contexto

### 📱 WhatsApp
- ✅ **Multi-conexões** - Vários números/chips
- ✅ **QR Code fácil** - Conexão rápida
- ✅ **Grupos suportados** - Atenda grupos também
- ✅ **Mídia automática** - Envie imagens, vídeos, áudios
- ✅ **Mensagens rápidas** - Respostas pré-definidas
- ✅ **Agendamento** - Programe mensagens

### 🤖 Automação
- ✅ **Chatbot inteligente** - Respostas automáticas
- ✅ **Fluxos personalizados** - Crie jornadas
- ✅ **Integração com IA** - OpenAI, Typebot, N8N
- ✅ **Webhooks** - Integre com outros sistemas
- ✅ **API completa** - Desenvolva suas integrações

### 📊 Gestão
- ✅ **Dashboard completo** - Métricas em tempo real
- ✅ **Relatórios detalhados** - Performance da equipe
- ✅ **Multi-empresas** - Gerencie várias empresas
- ✅ **Planos e assinaturas** - Sistema de cobrança
- ✅ **Permissões de usuário** - Admin, atendente, etc.

### 🎨 Interface
- ✅ **Design moderno** - Interface limpa e intuitiva
- ✅ **Responsivo** - Funciona em desktop e mobile
- ✅ **Modo escuro** - Conforto visual
- ✅ **Kanban integrado** - Visualize tickets
- ✅ **Chat interno** - Comunicação da equipe

---

## 🖥️ Demo

### Screenshots

**Dashboard Principal**
```
┌─────────────────────────────────────────────┐
│  📊 Tickets Abertos: 45  |  ⏰ Aguardando: 12│
│  ✅ Resolvidos Hoje: 89  |  👥 Online: 8     │
└─────────────────────────────────────────────┘
```

**Interface de Atendimento**
```
┌──────────────┬──────────────────────────────┐
│              │  💬 João Silva               │
│  Tickets     │  ─────────────────────────   │
│  Ativos      │  Cliente: Olá!               │
│              │  Você: Como posso ajudar?    │
│  [Lista]     │  Cliente: Preciso de suporte │
│              │                              │
│              │  [Digite sua mensagem...]    │
└──────────────┴──────────────────────────────┘
```

---

## 🚀 Instalação

### Instalação Rápida (1 comando)

```bash
wget https://raw.githubusercontent.com/augustofreires/Zapconverse/main/install.sh && chmod +x install.sh && sudo ./install.sh
```

⏱️ **Tempo:** 10-15 minutos | **O que faz:** Instala tudo automaticamente

### Customização (Opcional)

Quer editar logos, cores e textos visualmente? Instale o **aaPanel**:

```bash
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel
```

📖 **Documentação:**
- [📖 Instalação Simples](INSTALACAO_SIMPLES.md) - Instalação via terminal
- [🎨 Customização Visual](CUSTOMIZACAO_VISUAL.md) - Trocar logo, cores, etc.
- [🎛️ Instalação com aaPanel](INSTALACAO_AAPANEL.md) - Instalação + aaPanel integrado

---

## 📦 Requisitos

### Servidor
- **OS:** Ubuntu 20.04 / 22.04 LTS
- **RAM:** Mínimo 2GB (Recomendado 4GB)
- **CPU:** 2 cores
- **Disco:** 20GB SSD
- **Portas:** 3000, 3001 (ou 80, 443 com Nginx)

### Software
- Node.js 20.x
- PostgreSQL 14+
- Redis 7.x
- PM2
- Nginx (opcional)

---

## 🏗️ Arquitetura

```
┌──────────────────────────────────────────────────┐
│                   Frontend                       │
│              (React + Material-UI)               │
└─────────────────┬────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────┐
│                   Backend                        │
│         (Node.js + Express + Socket.IO)          │
└──────┬──────────┬──────────┬────────────────────┘
       │          │          │
       ▼          ▼          ▼
   ┌──────┐  ┌──────┐  ┌─────────┐
   │ PG   │  │Redis │  │WhatsApp │
   │ SQL  │  │      │  │Web API  │
   └──────┘  └──────┘  └─────────┘
```

---

## 📖 Documentação

### Guias de Instalação
- [⚡ Instalação Simples](INSTALACAO_SIMPLES.md) - **Recomendado**
- [🎨 Customização Visual](CUSTOMIZACAO_VISUAL.md) - **Para seus clientes**
- [🎛️ Instalação com aaPanel](INSTALACAO_AAPANEL.md) - Instalação completa
- [🎬 Roteiro de Vídeo-Aula](ROTEIRO_VIDEO_AULA.md) - Para gravação

### Configurações Avançadas
- [Instalação do Nginx](zapconverse/NGINX_SETUP.md)
- [Configuração SSL](zapconverse/SSL_SETUP.md)

### Para Desenvolvedores
```bash
# API Documentation (após instalação):
http://seu-servidor:3000/api-docs
```

---

## 🎯 Primeiros Passos

### 1️⃣ Após Instalação

Acesse: `http://seu-ip:3001`

**Login padrão:**
- Email: `admin@zapconverse.com`
- Senha: `admin`

⚠️ **Troque a senha imediatamente!**

### 2️⃣ Conectar WhatsApp

1. Vá em **Conexões** → **Adicionar**
2. Escolha um nome
3. Escaneie o QR Code com seu WhatsApp
4. Aguarde conectar ✅

### 3️⃣ Criar Filas

1. Vá em **Filas**
2. Crie departamentos (Vendas, Suporte, etc.)
3. Atribua atendentes

### 4️⃣ Começar Atendimentos

1. Entre em **Tickets**
2. Aguarde mensagens chegarem
3. Atenda seus clientes! 🎉

### 5️⃣ Personalizar (aaPanel)

**Para seus clientes personalizarem o sistema:**

1. Instale o aaPanel (comando na seção Instalação)
2. Acesse o painel visual
3. Troque logo, cores, textos facilmente
4. Veja o [Guia de Customização Visual](CUSTOMIZACAO_VISUAL.md)

💡 **aaPanel é opcional** - Use apenas para edição visual de arquivos!

---

## 🔧 Gerenciamento

### Comandos PM2

```bash
# Ver status
pm2 status

# Ver logs em tempo real
pm2 logs

# Reiniciar serviços
pm2 restart zapconverse-backend
pm2 restart zapconverse-frontend

# Parar serviços
pm2 stop all

# Monitor de recursos
pm2 monit
```

### Backup do Banco

```bash
# Backup
pg_dump -U zapuser zapconverse > backup_$(date +%Y%m%d).sql

# Restaurar
psql -U zapuser zapconverse < backup_20240101.sql
```

---

## 🔐 Segurança

### Recomendações
- ✅ Altere senha padrão do admin
- ✅ Use senhas fortes no PostgreSQL
- ✅ Configure firewall (UFW)
- ✅ Instale SSL/HTTPS com Let's Encrypt
- ✅ Faça backups regulares
- ✅ Mantenha o sistema atualizado

### Firewall
```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
```

---

## 🌐 Integrações

### Disponíveis
- **OpenAI** - ChatGPT para respostas automáticas
- **Typebot** - Chatbot visual
- **N8N** - Automação de workflows
- **Webhooks** - Integração customizada
- **API REST** - Desenvolva suas integrações

---

## 📊 Roadmap

### Em Desenvolvimento
- [ ] App Mobile (React Native)
- [ ] Integração com Instagram
- [ ] Integração com Facebook Messenger
- [ ] Sistema de tickets por email
- [ ] Relatórios avançados com BI
- [ ] Chamadas de voz VoIP
- [ ] Bot com IA mais avançada

---

## 🆘 Suporte

### Encontrou um bug?
Abra uma issue: [GitHub Issues](https://github.com/augustofreires/Zapconverse/issues)

### Precisa de ajuda?
- 📧 Email: suporte@zapconverse.com
- 💬 Telegram: [Grupo de Suporte]
- 📖 Wiki: [Documentação Completa]

### Troubleshooting Comum

**Backend não inicia:**
```bash
cd ~/Zapconverse/zapconverse/backend
npm run build
pm2 restart zapconverse-backend
pm2 logs zapconverse-backend
```

**WhatsApp desconecta:**
- Verifique se o celular está com internet
- Não use o WhatsApp Web em outro local
- Reconecte escaneando o QR novamente

**Erro de banco de dados:**
```bash
cd ~/Zapconverse/zapconverse/backend
npx sequelize db:migrate
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Augusto Freires**

- GitHub: [@augustofreires](https://github.com/augustofreires)
- LinkedIn: [Augusto Freires](https://linkedin.com/in/augustofreires)

---

## ⭐ Star History

Se este projeto te ajudou, considere dar uma ⭐!

---

## 🎓 Aprenda Mais

### Cursos e Tutoriais
- 📹 [Vídeo: Como Instalar](link-para-video)
- 📹 [Vídeo: Primeiros Passos](link-para-video)
- 📹 [Vídeo: Configuração Avançada](link-para-video)

### Comunidade
- 💬 Grupo do Telegram
- 💬 Discord Server
- 🐦 Twitter Updates

---

<div align="center">

**Desenvolvido com ❤️ por [Augusto Freires](https://github.com/augustofreires)**

[⬆ Voltar ao topo](#-zapconverse)

</div>
