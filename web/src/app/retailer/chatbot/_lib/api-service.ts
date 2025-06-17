import { FetchService } from './fetch-service';

interface ChatbotResponse {
    message: string;
    action?: 'research' | 'analyze' | 'brainstorm' | null;
}

class ChatbotService extends FetchService {
    private static instance: ChatbotService;

    private constructor() {
        super();
    }

    static getInstance(): ChatbotService {
        if (!ChatbotService.instance) {
            ChatbotService.instance = new ChatbotService();
        }
        return ChatbotService.instance;
    }

    async getChatbotResponse(params: ChatbotResponse): Promise<string> {
        const response = await this.fetch('/api/chatbot', {
            method: 'POST',
            body: JSON.stringify(params),
        });
        return response.json();
    }
}

export const chatbotService = ChatbotService.getInstance();
