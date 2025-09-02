require('dotenv').config();
const express = require('express');
const multer = require('multer');
const OpenAI = require('openai');

const app = express();
const upload = multer();

const BEARER_TOKEN = process.env.API_BEARER_TOKEN;

app.post('/ask', upload.single('file'), async (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ')? authHeader.substring(7): null;
  if (!token || token !== BEARER_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const question = req.body.question;
  if (!req.file || !question) {
    return res.status(400).json({ error: 'File and question are required' });
  }

  const xmlContent = req.file.buffer.toString('utf8');

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        { role: 'system', content: 'Você responde perguntas sobre arquivos XML. Responda somente com a informação solicitada.' },
        { role: 'user', content: `Arquivo XML:\n${xmlContent}\nPergunta: ${question}` }
      ]
    });

    const answer = completion.choices[0].message.content.trim();
    const message = `Resultado: ${answer}`;
    res.json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

