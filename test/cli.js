const { DecaChat } = require('../dist');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function startChat() {
  const apiKey = process.env.GROQ_API_KEY || await new Promise(resolve => {
    rl.question('Enter your Groq API key: ', resolve);
  });

  const chat = new DecaChat({
    apiKey,
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'mixtral-8x7b-32768',
    systemMessage: 'You are a helpful AI assistant.',
    intro: 'Hello! How can I help you today?'
  });

  console.log('\nGroq Chat started. Type "exit" to quit, "clear" to reset conversation.\n');

  // Start conversation with intro message
  const intro = await chat.chat('');
  console.log('\nAssistant:', intro, '\n');

  const askQuestion = async () => {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      if (input.toLowerCase() === 'clear') {
        chat.clearConversation();
        console.log('Conversation cleared.');
        askQuestion();
        return;
      }

      try {
        const response = await chat.chat(input);
        console.log('\nAssistant:', response, '\n');
      } catch (error) {
        console.error('Error:', error.message);
      }

      askQuestion();
    });
  };

  askQuestion();
}

startChat(); 