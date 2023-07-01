// Get DOM elements
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatFeed = document.querySelector('.chat-feed');

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
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input })
  });

  const { message } = await response.json();
  addMessage('ai', message);
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