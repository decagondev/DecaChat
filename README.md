# DecaChat

A lightweight and easy-to-use wrapper for OpenAI's Chat API. DecaChat provides a simple interface for creating chat-based applications with OpenAI's GPT models.

## Features

- 🚀 Simple, intuitive API
- 📝 TypeScript support
- 💾 Conversation management
- ⚙️ Configurable parameters
- 🛡️ Built-in error handling
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
  model?: string;      // Optional: Default 'gpt-3.5-turbo'
  maxTokens?: number;  // Optional: Default 1000
  temperature?: number; // Optional: Default 0.7
}
```

## API Reference

### Constructor

```typescript
const chat = new DecaChat(config: DecaChatConfig);
```

### Methods

#### `setSystemMessage(message: string): void`
Sets the system message for the conversation.

```typescript
chat.setSystemMessage('You are a helpful assistant specialized in JavaScript.');
```

#### `async chat(message: string): Promise<string>`
Sends a message and returns the assistant's response.

```typescript
const response = await chat.chat('What is a closure in JavaScript?');
```

#### `clearConversation(): void`
Clears the conversation history.

```typescript
chat.clearConversation();
```

#### `getConversation(): ChatMessage[]`
Returns the current conversation history.

```typescript
const history = chat.getConversation();
```

## Example Usage

```typescript
import { DecaChat } from 'deca-chat';

async function example() {
  // Initialize with custom configuration
  const chat = new DecaChat({
    apiKey: 'your-openai-api-key',
    model: 'gpt-4',
    maxTokens: 2000,
    temperature: 0.8
  });

  // Set a system message
  chat.setSystemMessage('You are a helpful coding assistant.');

  try {
    // Start a conversation
    const response1 = await chat.chat('How do I create a React component?');
    console.log('Assistant:', response1);

    // Continue the conversation
    const response2 = await chat.chat('How do I add props to it?');
    console.log('Assistant:', response2);

    // Get conversation history
    const history = chat.getConversation();
    console.log('Conversation History:', history);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Error Handling

The chat method throws errors when:
- The API key is invalid
- The API request fails
- Rate limits are exceeded
- Network errors occur

Always wrap API calls in try-catch blocks for proper error handling:

```typescript
try {
  const response = await chat.chat('Hello');
  console.log(response);
} catch (error) {
  console.error('Chat error:', error);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
