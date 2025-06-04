import { 
    FetchService 
} from "../api/fetch.service";

import {
    loadPrompt
} from "../../utils/prompts";

import {
    IRequest,
    IResponse
} from "../../types/api";

export class SimilarityService extends FetchService {
    private static instance: SimilarityService;

    private constructor() {
        super();
    }

    static getInstance(): SimilarityService {
        if (!SimilarityService.instance) {
            SimilarityService.instance = new SimilarityService();
        }
        return SimilarityService.instance;
    }

    public async getSimilarity(item1: string, item2: string): Promise<boolean> {
        const promptTemplate = loadPrompt('receipt-similarity.md');
        const [normA, normB] = [this.normalize(item1), this.normalize(item2)];
        const prompt = `${promptTemplate}\n\n[\n    \"${normA}\",\n    \"${normB}\"\n]`;
        const payload: IRequest = {
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        };
        const response = await this.fetch(payload);
        return this.parseResponse(response);
    }

    private parseResponse(response: IResponse): boolean {
        try {
            const text = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (text === 'true') return true;
            if (text === 'false') return false;
        } catch (e) {
            console.error('Error parsing similarity response:', e);
        }
        return false;
    }

    private normalize(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim();
    }
}

export default SimilarityService.getInstance();