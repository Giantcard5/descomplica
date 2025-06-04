import {
    IRequest,
    IResponse
} from "../../types/api";

export class FetchService {
    private static fetchService: FetchService;
    private readonly apiKey: string;
    private readonly apiUrl: string;

    public constructor() {
        this.apiKey = process.env.GEMINI_API_KEY as string;
        this.apiUrl = process.env.GEMINI_API_URL as string;
    }

    public static getInstance(): FetchService {
        if (!FetchService.fetchService) {
            FetchService.fetchService = new FetchService();
        }
        return FetchService.fetchService;
    }

    public async fetch(payload: IRequest): Promise<IResponse> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'x-goog-api-key': this.apiKey 
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching API:', error);
            throw error;
        }
    }

    public async fetchWithImage(prompt: string, images?: { mimeType: string; data: string }[]): Promise<string> {
        const contents = [{
            parts: [
                { text: prompt },
                ...(images?.map(image => ({
                    inlineData: {
                        mimeType: image.mimeType,
                        data: image.data
                    }
                })) || [])
            ]
        }];
        const payload: IRequest = { contents };
        const data = await this.fetch(payload);
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('No text response from Gemini API');
        return text;
    }
}

export default FetchService.getInstance();