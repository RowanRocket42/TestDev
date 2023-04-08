javascript
const express = require('express');
const openai = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('./Test Dev'));

openai.apiKey = process.env.OPENAI_API_KEY;

app.post('/api/generate-response', async (req, res) => {
  try {
    const prompt = req.body.message;

    const response = await openai.Completion.create({
      engine: 'davinci-codex',
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.send(response.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating response.');
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
