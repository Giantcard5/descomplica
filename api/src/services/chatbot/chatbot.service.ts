import {
    PrismaClientSingleton
} from '../../utils/prismaClient';

interface IGetChatbotResponse {
    message: string;
    action: string;
}

export class ChatbotService extends PrismaClientSingleton {
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

    async getChatbotResponse(params: IGetChatbotResponse): Promise<string> {
        const { message, action } = params;

        if (!message) {
            throw new Error('Message is required');
        };

        return JSON.stringify({ message: 'Hello, how can I help you today?' });
    }
}

export const chatbotService = ChatbotService.getInstance();