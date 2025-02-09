import OpenAI from 'openai';

export interface DecaChatConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
  intro?: string;
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
    this.openai = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl
    });

    this.model = config.model || 'gpt-4o-mini';
    this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
    this.maxTokens = config.maxTokens || 1000;
    this.temperature = config.temperature || 0.7;
    this.conversation = [];
    
    if (config.intro) {
      this.introMessage = config.intro;
    }
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
  }

  /**
   * Send a message and get a response
   * @param message - The user's message
   * @returns The assistant's response
   */
  async chat(message: string): Promise<string> {
    if (this.introMessage && this.conversation.length === 0) {
      this.conversation.push({ role: 'assistant', content: this.introMessage });
    }

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
    return [...this.conversation];
  }
}