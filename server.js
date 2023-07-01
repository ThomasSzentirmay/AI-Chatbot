const express = require('express');
const app = express();
const port = 3333;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Create an API endpoint for the chat
app.post('/api/chat', (req, res) => {
  // Implement the logic to interact with the OpenAI API here
  // Return the AI response to the client
  const response = { message: 'This is an AI response.' };
  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});