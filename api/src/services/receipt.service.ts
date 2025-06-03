import { loadPrompt } from "../prompts";

interface ReceiptItem {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
}

export class ReceiptService {
    private static instance: ReceiptService;
    private readonly apiKey: string;
    private readonly apiUrl: string;

    private constructor() {
        this.apiKey = process.env.GEMINI_API_KEY as string;
        this.apiUrl = process.env.GEMINI_API_URL as string;
    }

    static getInstance(): ReceiptService {
        if (!ReceiptService.instance) {
            ReceiptService.instance = new ReceiptService();
        }
        return ReceiptService.instance;
    }

    public async fetchAPI(prompt: string, images?: { mimeType: string; data: string }[]): Promise<string> {
        try {
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

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': this.apiKey
                },
                body: JSON.stringify({ contents })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error fetching API:', error);
            throw error;
        }
    }

    async analyzeReceipt(receipt: Express.Multer.File, method: 'photo' | 'file'): Promise<ReceiptItem[]> {
        const cleanBase64 = receipt.buffer.toString('base64');
        const prompt = loadPrompt(method === 'photo' ? 'receipt-photo.md' : 'receipt-file.md');

        const response = await this.fetchAPI(prompt, [{ mimeType: receipt.mimetype, data: cleanBase64 }]);

        if (!response || response.length === 0) {
            throw new Error('No items found on receipt');
        }

        let jsonString = response.trim();
        if (jsonString.startsWith('```')) {
            jsonString = jsonString.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '');
        }

        return JSON.parse(jsonString);
    };
};

export const receiptService = ReceiptService.getInstance();