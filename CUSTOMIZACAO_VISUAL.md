# 🎨 Guia de Customização Visual - Zapconverse

## 📌 Para seus Clientes

Este guia ensina como personalizar o Zapconverse para sua marca usando o **aaPanel** (interface visual - não precisa mexer no terminal).

---

## 🎛️ Instalar aaPanel

### 1. Conectar via SSH e executar:
```bash
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel
```

### 2. Salvar as credenciais mostradas:
```
URL: http://SEU_IP:7800/xxxxx
Usuário: xxxxxxx
Senha: xxxxxxxx
```

### 3. Acessar no navegador
Abra a URL mostrada e faça login.

---

## 🖼️ Trocar o Logo

### 📍 Logo Principal (Menu Lateral)

1. No aaPanel, clique em **Files** (Arquivos)
2. Navegue até:
   ```
   /home/deploy/zapconverse/zapconverse/frontend/src/assets/
   ```
3. Encontre o arquivo `logo.png`
4. Clique nos 3 pontinhos → **Delete** (deletar)
5. Clique em **Upload** → Selecione seu logo
6. **Importante:** Renomeie seu logo para `logo.png`

**Tamanho recomendado:** 200x50 pixels (PNG transparente)

### 📍 Favicon (Ícone do navegador)

1. Navegue até:
   ```
   /home/deploy/zapconverse/zapconverse/frontend/public/
   ```
2. Substitua os seguintes arquivos:
   - `favicon.ico` (32x32)
   - `favicon-16x16.png` (16x16)
   - `favicon-32x32.png` (32x32)
   - `apple-touch-icon.png` (180x180)

### 🔄 Aplicar mudanças

No terminal SSH:
```bash
cd /home/deploy/zapconverse/zapconverse/frontend
npm run build
pm2 restart zapconverse-frontend
```

Ou via aaPanel:
1. Vá em **Terminal**
2. Cole os comandos acima

---

## ✏️ Trocar Nome/Título do App

### 📍 Título da Página (Navegador)

1. No aaPanel → **Files**
2. Navegue até:
   ```
   /home/deploy/zapconverse/zapconverse/frontend/public/
   ```
3. Edite o arquivo `index.html`
4. Encontre a linha:
   ```html
   <title>Zapconverse</title>
   ```
5. Troque para:
   ```html
   <title>Nome da Sua Empresa</title>
   ```
6. Salve (Ctrl+S ou botão Save)

### 📍 Nome na Barra Lateral

1. Navegue até:
   ```
   /home/deploy/zapconverse/zapconverse/frontend/src/layout/
   ```
2. Edite o arquivo `MainListItems.js`
3. Procure por "Zapconverse" e substitua

### 🔄 Aplicar mudanças
```bash
cd /home/deploy/zapconverse/zapconverse/frontend
npm run build
pm2 restart zapconverse-frontend
```

---

## 🎨 Trocar Cores do Sistema

### 📍 Cores Principais

1. Navegue até:
   ```
   /home/deploy/zapconverse/zapconverse/frontend/src/
   ```
2. Edite o arquivo `App.js` ou `theme.js`
3. Encontre as definições de cor:
   ```javascript
   primary: {
     main: "#6B46C1",  // Cor principal
   },
   secondary: {
     main: "#F50057",  // Cor secundária
   }
   ```
4. Troque pelos códigos das suas cores

**Dica:** Use um [color picker](https://htmlcolorcodes.com/) para escolher.

### 🔄 Aplicar mudanças
```bash
cd /home/deploy/zapconverse/zapconverse/frontend
npm run build
pm2 restart zapconverse-frontend
```

---

## 💬 Personalizar Mensagens

### 📍 Mensagem de Boas-vindas

1. No sistema Zapconverse (não no aaPanel)
2. Vá em **Conexões** → Edite sua conexão
3. Campos disponíveis:
   - **Mensagem de Saudação** - Primeira mensagem ao cliente
   - **Mensagem de Despedida** - Ao finalizar atendimento
   - **Mensagem Fora do Horário** - Quando não há atendentes

**Exemplo:**
```
Olá! 👋 Bem-vindo à *Nome da Empresa*!

Estamos prontos para te atender.
Em que posso ajudar?
```

---

## 📝 Editar Textos do Sistema

### Via aaPanel (Fácil)

1. **Files** → Navegue até:
   ```
   /home/deploy/zapconverse/zapconverse/frontend/src/
   ```
2. Use a busca do aaPanel (ícone de lupa)
3. Procure pelo texto que quer mudar
4. Edite e salve
5. Rebuild:
   ```bash
   cd /home/deploy/zapconverse/zapconverse/frontend
   npm run build
   pm2 restart zapconverse-frontend
   ```

---

## 🔐 Trocar Dados do Admin

### Email e Senha

1. Acesse o sistema
2. Vá em **Usuários**
3. Edite o usuário admin
4. Altere email e senha

### Ou via Banco de Dados (aaPanel)

1. No aaPanel → **Database** → **phpPgAdmin**
2. Selecione banco `zapconverse`
3. Tabela `Users`
4. Edite a linha do admin

---

## 🗂️ Estrutura de Pastas Importante

```
zapconverse/
├── frontend/
│   ├── public/              ← Favicon, index.html
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── assets/          ← Logo principal
│   │   │   └── logo.png
│   │   ├── components/      ← Componentes do sistema
│   │   └── pages/           ← Páginas
│   └── .env                 ← Configurações frontend
│
└── backend/
    ├── public/              ← Arquivos enviados
    └── .env                 ← Configurações backend
```

---

## ⚠️ Dicas Importantes

### ✅ Sempre faça backup antes de editar
```bash
# Backup automático via aaPanel:
# Database → Backup → Create Backup
```

### ✅ Após qualquer mudança no código:
```bash
cd /home/deploy/zapconverse/zapconverse/frontend
npm run build
pm2 restart zapconverse-frontend
```

### ✅ Teste em navegador anônimo
Ctrl+Shift+N (Chrome) para ver mudanças sem cache

### ✅ Limpar cache do navegador
Se não ver mudanças: Ctrl+Shift+R

---

## 🎨 Customizações Populares

### 1. Trocar Logo + Nome
⏱️ Tempo: 5 minutos
- Substitua `logo.png`
- Edite `index.html`
- Rebuild frontend

### 2. Mudar Cores do Sistema
⏱️ Tempo: 10 minutos
- Edite `App.js` ou `theme.js`
- Troque códigos hexadecimais
- Rebuild frontend

### 3. Personalizar Mensagens
⏱️ Tempo: 2 minutos
- Via painel do sistema
- Conexões → Editar

### 4. Trocar Favicon
⏱️ Tempo: 3 minutos
- Upload em `/public/`
- Limpar cache do navegador

---

## 📹 Video Tutorial

*(Adicione link do seu vídeo aqui)*

---

## 🆘 Problemas Comuns

### Logo não aparece
- Verifique se o arquivo é PNG transparente
- Nome exato: `logo.png`
- Tamanho recomendado: 200x50px
- Faça rebuild do frontend

### Mudanças não aparecem
- Limpe cache: Ctrl+Shift+R
- Abra aba anônima
- Verifique se fez rebuild

### Erro ao fazer rebuild
```bash
cd /home/deploy/zapconverse/zapconverse/frontend
rm -rf node_modules
npm install
npm run build
pm2 restart zapconverse-frontend
```

---

## 📞 Suporte

Precisa de ajuda com customização?
- 💬 Grupo de Suporte VIP
- 📧 Email: suporte@zapconverse.com
- 🐛 GitHub Issues

---

**🎨 Deixe o Zapconverse com a cara da sua marca!**
