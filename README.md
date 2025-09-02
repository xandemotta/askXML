# askXML

API em Node.js para enviar arquivos XML ao GPT e responder perguntas sobre o conteúdo.

## Configuração

1. Copie `.env.example` para `.env` e preencha as variáveis:
   ```bash
   cp .env.example .env
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

## Uso

Envie um POST para `/ask` com um arquivo XML e uma pergunta. É necessário o cabeçalho `Authorization: Bearer <token>`.

Exemplo com `curl`:
```bash
curl -X POST http://localhost:3000/ask \
  -H "Authorization: Bearer seu_token" \
  -F "file=@nota.xml" \
  -F "question=quem é o remetente?"
```

A resposta virá no formato:
```json
{"message": "Resultado: <resposta>"}
```
