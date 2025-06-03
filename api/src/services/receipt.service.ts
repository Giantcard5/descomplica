import { 
    PrismaClientSingleton 
} from "../utils/prismaClient";

import { 
    loadPrompt 
} from "../prompts";

import { productsService } from "./products.service";

interface ReceiptItem {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
}

export class ReceiptService extends PrismaClientSingleton {
    private static instance: ReceiptService;
    private readonly apiKey: string;
    private readonly apiUrl: string;

    private constructor() {
        super();
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

        const items: ReceiptItem[] = JSON.parse(jsonString);
        // const storeId = receipt.storeId || "default-store-id"; // Adjust as needed to get storeId
        // const storeId = "0f1ee5c1-834d-458c-862c-8cbf053aebfe"; // Adjust as needed to get storeId
        // const suggestions: { item: ReceiptItem, suggestion: string }[] = [];

        // for (const item of items) {
        //     const exists = await productsService.findByIdOrName(item.product_id, item.product_name, storeId);
        //     if (!exists) {
        //         // Check for similar product (same name, different id)
        //         const similar = await productsService.getProducts();
        //         const similarProduct = similar.find(p => p.name === item.product_name && p.id !== item.product_id && p.storeId === storeId);
        //         if (similarProduct) {
        //             suggestions.push({
        //                 item,
        //                 suggestion: `Produto semelhante encontrado: ${similarProduct.name} (ID: ${similarProduct.id}). Considere substituir.`
        //             });
        //         } else {
        //             await productsService.createProduct({
        //                 id: item.product_id,
        //                 name: item.product_name,
        //                 storeId: storeId
        //             });
        //         }
        //     }
        // }

        // if (suggestions.length > 0) {
        //     // You may want to return suggestions or handle them as needed
        //     console.log("Sugestões de substituição de produtos:", suggestions);
        // }

        return items;
    };
};

export const receiptService = ReceiptService.getInstance();