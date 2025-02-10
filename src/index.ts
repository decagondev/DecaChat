import OpenAI from 'openai';

/**
 * Configuration options for initializing a DecaChat instance
 * @interface
 * @property {string} apiKey - Any API key compatible with the OpenAI API required for authentication
 * @property {string} [model] - The AI model to use (defaults to 'gpt-4o-mini')
 * @property {string} [baseUrl] - Custom API endpoint URL (defaults to 'https://api.openai.com/v1')
 * @property {number} [maxTokens] - Maximum number of tokens in the response (defaults to 1000)
 * @property {number} [temperature] - Controls randomness in responses from 0 (deterministic) to 1 (random) (defaults to 0.7)
 * @property {string} [intro] - Optional initial message from the assistant to start the conversation
 * @property {string} [systemMessage] - System message to set the behavior of the AI
 * @property {boolean} [useBrowser] - Whether to allow browser usage (required for browser environments) (Ensure API keys are secured!)
 */
export interface DecaChatConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
  intro?: string;
  systemMessage?: string;
  useBrowser?: boolean;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class DecaChat {
  private openai: OpenAI;
  private model: string;
  private baseUrl?: string;
  private maxTokens: number;
  private temperature: number;
  private conversation: ChatMessage[];
  private introMessage?: string;

  constructor(config: DecaChatConfig) {
    this.model = config.model || 'gpt-4o-mini';
    this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
    this.maxTokens = config.maxTokens || 1000;
    this.temperature = config.temperature || 0.7;
    this.conversation = [];
    
    if (config.systemMessage) {
      this.setSystemMessage(config.systemMessage);
    }

    if (config.intro) {
      this.introMessage = config.intro;
      this.conversation.push({ role: 'assistant', content: config.intro });
    }

    this.openai = new OpenAI({
      apiKey: config.apiKey,
      baseURL: this.baseUrl,
      dangerouslyAllowBrowser: config.useBrowser
    });
  }

  /**
   * Set the system message for the conversation
   * @param message - The system message to set
   */
  setSystemMessage(message: string): void {
    this.conversation = [{ role: 'system', content: message }];
  }

  /**
   * Set a custom introduction message
   * @param message - The introduction message to be shown when starting a conversation
   */
  setIntro(message: string): void {
    this.introMessage = message;
    this.conversation.push({ role: 'assistant', content: message });
  }

  /**
   * Send a message and get a response
   * @param message - The user's message
   * @returns The assistant's response
   */
  async chat(message: string): Promise<string> {
    this.conversation.push({ role: 'user', content: message });

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: this.conversation,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      const reply = response.choices[0]?.message?.content || '';
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
    return structuredClone(this.conversation);
  }
}