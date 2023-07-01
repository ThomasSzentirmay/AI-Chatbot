import { config } from "dotenv";
config();

import express from 'express';
import { join } from 'path';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = 3333;

// Serve static files from the "public" directory
const publicPath = join(__dirname, 'public');
app.use(express.static(publicPath));

// Initialize OpenAI API client
const openai = new OpenAIApi({
  apiKey: process.env.API_KEY,
});

// Create an API endpoint for the chat
app.post('/api/chat', async (req, res) => {
  const { input } = req.body;

  // Send user input to the OpenAI API
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: input }],
  });

  const aiMessage = response.data.choices[0].message.content;

  // Return the AI response to the client
  res.json({ message: aiMessage });
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});