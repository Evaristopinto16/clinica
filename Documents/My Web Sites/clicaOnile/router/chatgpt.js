const express = require('express');
const axios = require('axios');
const { createOpenAI } = require('@openai/api');
require('dotenv').config();

const router = express.Router();
 
const openai = createOpenAI(process.env.OPENAI_API_KEY);

router.use(express.json());

router.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.complete({
      engine: 'davinci',
      prompt: `Me: ${message}\nBot:`,
      maxTokens: 150,
      n: 1,
      stop: '\n',
    });

    const answer = response.data.choices[0].text.trim();
    res.send({ answer });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Algo deu errado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
