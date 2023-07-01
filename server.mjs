import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
import express from 'express';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
// Get the current directory path
const __dirname = dirname(__filename);

config();

const app = express();
const port = 3333;

// Middleware to parse the request body as JSON
app.use(express.json());

// Serve static files from the "public" directory
const publicPath = join(__dirname, 'public');
app.use(express.static(publicPath));

// Initialize OpenAI API client
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

// Create an API endpoint for the chat
app.post('/api/chat', async (req, res) => {
  const { input } = req.body;

  // Send user input to the OpenAI API
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: input }],
    });

    const aiMessage = response.data.choices[0].message.content;

    console.log('AI response:', aiMessage); // Log the AI response to the console

    // Return the AI response to the client
    res.json({ message: aiMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});