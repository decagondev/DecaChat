import { Configuration, OpenAIApi } from 'openai';

export interface DecaChatConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class DecaChat {
  private openai: OpenAIApi;
  private model: string;
  private baseUrl?: string;
  private maxTokens: number;
  private temperature: number;
  private conversation: ChatMessage[];

  constructor(config: DecaChatConfig) {
    const configuration = new Configuration({
      apiKey: config.apiKey,
      basePath: config.baseUrl
    });

    this.openai = new OpenAIApi(configuration);
    this.model = config.model || 'gpt-4o-mini';
    this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
    this.maxTokens = config.maxTokens || 1000;
    this.temperature = config.temperature || 0.7;
    this.conversation = [];
  }

  /**
   * Set the system message for the conversation
   * @param message - The system message to set
   */
  setSystemMessage(message: string): void {
    this.conversation = [{ role: 'system', content: message }];
  }

  /**
   * Send a message and get a response
   * @param message - The user's message
   * @returns The assistant's response
   */
  async chat(message: string): Promise<string> {
    this.conversation.push({ role: 'user', content: message });

    try {
      const response = await this.openai.createChatCompletion({
        model: this.model,
        messages: this.conversation,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      const reply = response.data.choices[0]?.message?.content || '';
      this.conversation.push({ role: 'assistant', content: reply });
      return reply;
    } catch (error) {
      throw new Error(`Failed to get response: ${error}`);
    }
  }

  /**
   * Clear the conversation history
   */
  clearConversation(): void {
    this.conversation = [];
  }

  /**
   * Get the current conversation history
   * @returns Array of chat messages
   */
  getConversation(): ChatMessage[] {
    return [...this.conversation];
  }

  /**
   * Add an initial assistant message to be displayed as an intro
   * @param message - The intro message to be displayed
   */
  intro(message: string): void {
    this.conversation.push({ role: 'assistant', content: message });
  }
}