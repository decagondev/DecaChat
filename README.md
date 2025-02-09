# DecaChat

A lightweight and easy-to-use wrapper for OpenAI's Chat API. DecaChat provides a simple interface for creating chat-based applications with OpenAI's GPT models.

## Features

- 🚀 Simple, intuitive API
- 📝 TypeScript support
- 💾 Conversation management
- ⚙️ Configurable parameters
- 🛡️ Built-in error handling
- 🌐 Custom base URL support
- 🔄 Conversation history management
- 🤖 System message configuration
- 👋 Customizable introduction messages
- 📦 Zero dependencies (except OpenAI SDK)

## Installation

```bash
npm install deca-chat
```

## Quick Start

```typescript
import { DecaChat } from 'deca-chat';

// Initialize the chat client
const chat = new DecaChat({
  apiKey: 'your-openai-api-key'
});

// Send a message and get a response
async function example() {
  const response = await chat.chat('Hello, how are you?');
  console.log(response);
}
```

## Configuration

The `DecaChat` constructor accepts a configuration object with the following options:

```typescript
interface DecaChatConfig {
  apiKey: string;      // Required: Your OpenAI API key
  model?: string;      // Optional: Default 'gpt-4o-mini'
  baseUrl?: string;    // Optional: Default 'https://api.openai.com/v1'
  maxTokens?: number;  // Optional: Default 1000
  temperature?: number; // Optional: Default 0.7
  intro?: string;      // Optional: Custom introduction message
}
```

## API Reference

### Constructor

```typescript
const chat = new DecaChat(config: DecaChatConfig);
```

### Methods

#### `setSystemMessage(message: string): void`
Sets the system message for the conversation. This resets the conversation history and starts with the new system message.

```typescript
chat.setSystemMessage('You are a helpful assistant specialized in JavaScript.');
```

#### `setIntro(message: string): void`
Sets a custom introduction message that will be sent to the user when starting a new conversation.

```typescript
chat.setIntro('Hi! I'm your AI assistant. How can I help you today?');
```

#### `async chat(message: string): Promise<string>`
Sends a message and returns the assistant's response. The message and response are automatically added to the conversation history.

```typescript
const response = await chat.chat('What is a closure in JavaScript?');
```

#### `clearConversation(): void`
Clears the entire conversation history, including the system message.

```typescript
chat.clearConversation();
```

#### `getConversation(): ChatMessage[]`
Returns the current conversation history, including system messages, user messages, and assistant responses.

```typescript
const history = chat.getConversation();
```

## Example Usage

### Basic Chat Application

```typescript
import { DecaChat } from 'deca-chat';

async function example() {
  // Initialize with custom configuration including intro
  const chat = new DecaChat({
    apiKey: 'your-openai-api-key',
    model: 'gpt-4',
    maxTokens: 2000,
    temperature: 0.8,
    intro: 'Hello! I'm your coding assistant. Ask me anything about programming!'
  });

  // Or set the intro message after initialization
  chat.setIntro('Hi there! Ready to help with your coding questions!');

  // The intro message will be automatically sent when starting a conversation
  const response = await chat.chat('How do I create a React component?');
  console.log('Assistant:', response);
}
```

### Custom API Endpoint

```typescript
const chat = new DecaChat({
  apiKey: 'your-api-key',
  baseUrl: 'https://your-custom-endpoint.com/v1',
  model: 'gpt-4o-mini'
});
```

### Managing Conversations

```typescript
// Start with a system message
chat.setSystemMessage('You are a helpful assistant.');

// Have a conversation
await chat.chat('What is TypeScript?');
await chat.chat('How does it differ from JavaScript?');

// Get the conversation history
const history = chat.getConversation();
console.log(history);
/* Output:
[
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is TypeScript?' },
  { role: 'assistant', content: '...' },
  { role: 'user', content: 'How does it differ from JavaScript?' },
  { role: 'assistant', content: '...' }
]
*/

// Clear the conversation and start fresh
chat.clearConversation();
```

## Error Handling

The chat method throws errors when:
- The API key is invalid
- The API request fails
- Rate limits are exceeded
- Network errors occur
- Invalid model specified
- Custom endpoint is unreachable

Always wrap API calls in try-catch blocks for proper error handling:

```typescript
try {
  const response = await chat.chat('Hello');
  console.log(response);
} catch (error) {
  console.error('Chat error:', error);
}
```

## Best Practices

1. **System Messages**: Set appropriate system messages to guide the assistant's behavior
2. **Conversation Management**: Clear conversations when starting new topics
3. **Error Handling**: Always implement proper error handling
4. **Resource Management**: Monitor token usage and conversation length
5. **API Key Security**: Never expose your API key in client-side code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - see the [LICENSE](LICENSE) file for details.