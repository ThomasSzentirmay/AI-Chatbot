// Get DOM elements
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatFeed = document.querySelector('.chat-feed');

// Initialize OpenAI API client
const openai = new OpenAIApi({
  apiKey: process.env.API_KEY,
});

// Function to add a message to the chat feed
function addMessage(role, content) {
  const messageClass = role === 'user' ? 'user-message' : 'ai-message';
  const messageElement = document.createElement('li');
  messageElement.classList.add(messageClass);
  messageElement.textContent = content;
  chatFeed.appendChild(messageElement);
  // Scroll to the bottom of the chat feed
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

// Function to handle user input and send it to the API
async function sendMessage() {
  const input = userInput.value;
  if (input.trim() === '') return; // Ignore empty input
  addMessage('user', input);
  userInput.value = ''; // Clear input field

  // Send user input to the API
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  });

  const responseContent = res.data.choices[0].message.content;
  addMessage('ai', responseContent);
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for the Enter key
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    sendMessage();
  }
});