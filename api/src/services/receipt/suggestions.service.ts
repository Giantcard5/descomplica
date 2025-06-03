import {
    ProductsService
} from "../store/products.service";

export class SuggestionsService {
    private static instance: SuggestionsService;
    private readonly apiKey: string;
    private readonly apiUrl: string;
    private readonly productsService: ProductsService;

    private constructor() {
        this.apiKey = process.env.GEMINI_API_KEY as string;
        this.apiUrl = process.env.GEMINI_API_URL as string;
        this.productsService = ProductsService.getInstance();
    }

    static getInstance(): SuggestionsService {
        if (!SuggestionsService.instance) {
            SuggestionsService.instance = new SuggestionsService();
        }
        return SuggestionsService.instance;
    }

    public async fetch(prompt: string, values: any): Promise<any> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': this.apiKey
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt },
                                { text: Array.isArray(values) ? values.join(', ') : String(values) }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error fetching API:', error);
            throw error;
        }
    }

    public async getSimilarity() {

    }

    public normalize(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim();
    }
}

export default SuggestionsService.getInstance();