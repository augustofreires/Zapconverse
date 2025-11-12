# 🎬 Roteiro para Vídeo-Aula - Instalação Zapconverse

## 📌 Informações do Vídeo

**Duração estimada:** 15-20 minutos
**Público-alvo:** Iniciantes e intermediários
**Objetivo:** Ensinar instalação completa do Zapconverse

---

## 🎯 Estrutura do Vídeo

### 1. INTRODUÇÃO (2 min)
```
[Tela: Logo Zapconverse]

"Olá! Bem-vindo ao curso de instalação do Zapconverse,
o sistema completo de atendimento com WhatsApp multi-atendentes!"

[Mostrar dashboard funcionando]

"Neste vídeo você vai aprender a instalar do zero,
e ao final terá um sistema completo funcionando!"
```

**O que mostrar:**
- ✅ Dashboard em funcionamento
- ✅ Exemplo de atendimento
- ✅ QR Code do WhatsApp

---

### 2. PRÉ-REQUISITOS (2 min)

```
"Antes de começar, você vai precisar de:"

1. Uma VPS (mostrar tela da Contabo/DigitalOcean)
2. Ubuntu 20.04 ou 22.04
3. Mínimo 2GB de RAM (melhor 4GB)
4. Acesso SSH (PuTTY no Windows ou Terminal no Mac)

[Mostrar tela de login SSH]

"Eu já estou conectado aqui no meu servidor..."
```

**O que mostrar:**
- ✅ Tela do provedor VPS
- ✅ Especificações do servidor
- ✅ Como conectar via SSH

---

### 3. INSTALAÇÃO AUTOMÁTICA (8 min)

```
"A instalação é super simples! Vou usar o script automático
que já faz tudo pra gente."

[Terminal visível]

"Primeiro, vamos baixar o instalador:"
```

#### 3.1 Download do Script
```bash
wget https://raw.githubusercontent.com/augustofreires/Zapconverse/main/install-aapanel.sh
```

```
"Agora vamos dar permissão de execução:"
```

```bash
chmod +x install-aapanel.sh
```

```
"E agora é só executar!"
```

```bash
sudo ./install-aapanel.sh
```

#### 3.2 Configuração Interativa

```
"O script vai pedir algumas informações:"

1. IP do servidor: [MOSTRAR onde pegar]
   "Você pode pegar o IP no painel do seu provedor"

2. Senha do PostgreSQL: [criar uma senha forte]
   "Crie uma senha forte e ANOTE em algum lugar!"

3. Email do admin: seu@email.com
   "Este será seu email de login"

4. Instalar aaPanel?: Digite 's'
   "O aaPanel facilita muito o gerenciamento!"
```

**IMPORTANTE:** Mostrar cada tela devagar!

#### 3.3 Aguardando Instalação

```
"Agora é só aguardar! O script vai instalar:
- Node.js
- PostgreSQL
- Redis
- aaPanel
- E configurar tudo automaticamente!"

[Mostrar progresso na tela]

"Isso pode levar de 10 a 15 minutos..."
```

**Dica:** Use time-lapse aqui ou edite para ser mais rápido!

---

### 4. ACESSO AO SISTEMA (3 min)

```
"Instalação concluída! Veja as informações:"

[Mostrar tela final do script com todas as URLs]

"Anote essas informações importantes!"
```

#### 4.1 Acessar Frontend
```
"Vamos acessar o sistema!"

[Abrir navegador]

http://SEU_IP:3001

[Mostrar tela de login]

"Use o email que você cadastrou e a senha 'admin'"

⚠️ "IMPORTANTE: Troque essa senha logo após o login!"
```

#### 4.2 Primeiro Acesso

```
[Fazer login]

"Pronto! Estamos dentro do sistema!"

[Mostrar dashboard]

"Aqui está o painel principal com todas as estatísticas"
```

---

### 5. CONECTAR WHATSAPP (3 min)

```
"Agora vamos conectar o WhatsApp!"

[Ir em Conexões → Adicionar]

1. "Dê um nome para esta conexão"
   Exemplo: "Atendimento Principal"

2. "Clique em Salvar"

3. [Mostrar QR Code na tela]
   "Agora pegue seu celular..."

4. "Abra o WhatsApp"
   WhatsApp → Mais opções → Aparelhos conectados

5. "Escaneie este QR Code"

6. [Aguardar conectar]
   "Pronto! WhatsApp conectado!"
```

**Demonstrar:**
- ✅ Pegar celular
- ✅ Abrir WhatsApp
- ✅ Escanear QR Code
- ✅ Mostrar status "Conectado" (verde)

---

### 6. CONFIGURAÇÕES BÁSICAS (2 min)

```
"Vamos fazer algumas configurações essenciais!"
```

#### 6.1 Criar Fila de Atendimento
```
[Ir em Filas]

1. "Clique em Adicionar"
2. "Nome: Suporte" (ou Vendas)
3. "Cor: Escolha uma cor"
4. "Salvar"

"Pronto! Agora você tem uma fila organizada!"
```

#### 6.2 Adicionar Atendentes (se houver)
```
[Ir em Usuários]

1. "Clique em Adicionar"
2. "Preencha: Nome, Email, Senha"
3. "Perfil: Atendente"
4. "Filas: Selecione a fila criada"
5. "Salvar"
```

---

### 7. PRIMEIRO ATENDIMENTO (2 min)

```
"Vamos fazer um teste!"

[Pegar celular]

"Do meu celular pessoal, vou mandar uma mensagem
para o WhatsApp conectado..."

[Enviar mensagem de teste]

[Voltar para o sistema]

"Olha só! A mensagem chegou aqui!"

[Mostrar ticket criado]

"Agora é só clicar e responder!"

[Responder a mensagem]

"E pronto! O cliente recebe na hora!"
```

**Demonstrar ao vivo:**
- ✅ Enviar mensagem
- ✅ Ticket aparecer
- ✅ Responder
- ✅ Mensagem chegar no celular

---

### 8. AAPANEL (BÔNUS) (2 min)

```
"E tem mais! Você instalou o aaPanel!"

[Abrir aaPanel no navegador]

http://SEU_IP:7800/xxxxx

[Fazer login com credenciais mostradas na instalação]

"Com o aaPanel você pode:"

1. [Mostrar Files] "Gerenciar arquivos visualmente"
2. [Mostrar Database] "Acessar o banco de dados"
3. [Mostrar Monitor] "Ver uso de CPU e RAM em tempo real"
4. [Mostrar Security] "Configurar firewall"
5. [Mostrar SSL] "Instalar certificado SSL"

"É bem mais fácil que usar só terminal!"
```

---

### 9. CONCLUSÃO (2 min)

```
"Parabéns! Você instalou com sucesso o Zapconverse!"

[Mostrar resumo rápido]

"Agora você tem um sistema completo de atendimento
rodando no seu próprio servidor!"

✅ WhatsApp conectado
✅ Multi-atendentes
✅ Filas organizadas
✅ Gerenciamento fácil com aaPanel

"Próximos passos:"
- Configure mensagens rápidas
- Ative o chatbot
- Personalize as cores do sistema
- Adicione mais atendentes

"Links úteis na descrição:"
📖 Documentação completa
💬 Grupo de suporte
🐛 Reportar problemas

"Se este vídeo te ajudou, deixa o like e se inscreve!"

"Até a próxima! 👋"
```

---

## 📝 Checklist de Gravação

Antes de gravar, certifique-se:

### Preparação
- [ ] VPS limpa e pronta
- [ ] Celular com WhatsApp disponível (para demo)
- [ ] Outro celular para enviar teste
- [ ] Gravador de tela configurado
- [ ] Microfone testado
- [ ] Navegador aberto (Chrome/Firefox)
- [ ] Terminal SSH aberto

### Durante a gravação
- [ ] Fale devagar e claro
- [ ] Mostre cada comando na tela por 3-5 segundos
- [ ] Não pule etapas
- [ ] Explique possíveis erros
- [ ] Mostre o resultado final funcionando

### Edição
- [ ] Acelerar partes longas (instalação)
- [ ] Adicionar legendas nos comandos importantes
- [ ] Zoom quando necessário
- [ ] Música de fundo suave (opcional)
- [ ] Cartões no final (links, CTA)

---

## 🎨 Recursos Visuais Sugeridos

### Telas para Mostrar
1. **Intro animada** com logo Zapconverse
2. **Dashboard funcionando** (preview)
3. **Terminal SSH** (comandos grandes e visíveis)
4. **Navegador** mostrando cada tela do sistema
5. **Celular** (camera secundária para QR Code)
6. **Split screen** (sistema + WhatsApp)

### Textos na Tela
```
╔════════════════════════════════════╗
║  Instale seu Zapconverse agora!   ║
║  Link na descrição ↓               ║
╚════════════════════════════════════╝
```

### Momentos para Close-up
- Copiar comandos
- QR Code do WhatsApp
- Credenciais do aaPanel
- Primeira mensagem chegando

---

## 💰 Dicas para Venda

### Argumentos de Venda
```
"Por que o Zapconverse?"

✅ Código Fonte Completo - Você é dono!
✅ Instalação Simples - Em minutos!
✅ Multi-atendentes - Escale seu negócio!
✅ Custo Zero Mensal - Sem taxas de SaaS!
✅ Customizável - Adapte ao seu negócio!
✅ Suporte Incluído - Grupo VIP!
```

### Call to Action
```
"Link para comprar na descrição!
Use o cupom PRIMEIRA-VENDA para 20% de desconto!"

[Mostrar preço riscado vs preço com desconto]
~~R$ 497~~ → R$ 397
```

---

## 🔗 Links para Descrição do Vídeo

```
🚀 ZAPCONVERSE - Sistema de Atendimento WhatsApp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 COMPRAR O SISTEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 Link: [seu-link-de-venda]
💰 Cupom PRIMEIRA-VENDA: 20% OFF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 DOCUMENTAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Docs: https://github.com/augustofreires/Zapconverse
🎛️ Instalação aaPanel: [link]
🔧 Troubleshooting: [link]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 SUPORTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Grupo VIP: [link-telegram]
🐛 Issues: https://github.com/augustofreires/Zapconverse/issues
📧 Email: suporte@zapconverse.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📹 OUTROS VÍDEOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶️ Configuração Avançada
▶️ Integração com ChatGPT
▶️ Criando Chatbots
▶️ API e Webhooks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️ TIMESTAMPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
00:00 - Introdução
02:00 - Pré-requisitos
04:00 - Instalação Automática
12:00 - Primeiro Acesso
15:00 - Conectar WhatsApp
18:00 - Configurações Básicas
20:00 - Primeiro Atendimento
22:00 - aaPanel (Bônus)
24:00 - Conclusão

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#zapconverse #whatsapp #atendimento #crm
```

---

## 🎯 Métricas para Acompanhar

Após publicar o vídeo:
- [ ] Views nas primeiras 24h
- [ ] Taxa de retenção (objetivo: >60%)
- [ ] Comentários e dúvidas
- [ ] Conversão de vendas
- [ ] Downloads do sistema

---

## ✅ Checklist Final

Antes de publicar:
- [ ] Vídeo gravado e editado
- [ ] Thumbnail atraente criada
- [ ] Título otimizado para SEO
- [ ] Descrição completa com links
- [ ] Tags relevantes adicionadas
- [ ] Link de venda funcionando
- [ ] Grupo de suporte criado
- [ ] Testar instalação uma última vez

---

**BOA SORTE COM AS VENDAS! 🚀💰**
