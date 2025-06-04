import {
    PrismaClientSingleton
} from "../../utils/prismaClient";

import {
    loadPrompt
} from "../../utils/prompts";

import {
    StoreService
} from "../../services/store/store.service";
import {
    ProductsService
} from "../../services/store/products.service";

import {
    IReceiptItem
} from "../../types/receipt";

import {
    FetchService 
} from "../api/fetch.service";

import { 
    SimilarityService 
} from "./similarity.service";

import { 
    IProduct 
} from "../../types/product";

export class ReceiptService extends PrismaClientSingleton {
    private static instance: ReceiptService;
    private readonly storeService: StoreService;
    private readonly productsService: ProductsService;
    private readonly fetchService: FetchService;
    private readonly similarityService: SimilarityService;

    private constructor() {
        super();
        this.storeService = StoreService.getInstance();
        this.productsService = ProductsService.getInstance();
        this.fetchService = FetchService.getInstance();
        this.similarityService = SimilarityService.getInstance();
    }

    static getInstance(): ReceiptService {
        if (!ReceiptService.instance) {
            ReceiptService.instance = new ReceiptService();
        }
        return ReceiptService.instance;
    }

    async analyzeReceipt(receipt: Express.Multer.File, method: 'photo' | 'file', token: string): Promise<IReceiptItem[]> {
        const cleanBase64 = receipt.buffer.toString('base64');
        const prompt = loadPrompt(method === 'photo' ? 'receipt-photo.md' : 'receipt-file.md');

        const response = await this.fetchService.fetchWithImage(prompt, [{ mimeType: receipt.mimetype, data: cleanBase64 }]);

        if (!response || response.length === 0) {
            throw new Error('No items found on receipt');
        }

        let jsonString = response.trim();
        if (jsonString.startsWith('```')) {
            jsonString = jsonString.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '');
        }

        const items: IReceiptItem[] = JSON.parse(jsonString);
        const storeId = await this.storeService.getStoreId(token);

        const products: IReceiptItem[] = [];

        for (const item of items) {
            const exists = await this.productsService.findByIdOrName(item.product_id, item.product_name, storeId);
            if (!exists?.name) {
                const similarity = await this.similarityService.getSimilarity(item.product_name, exists?.name || '');
                if (similarity) {
                    products.push({
                        product_id: exists?.id || '',
                        product_name: exists?.name || '',
                        quantity: item.quantity,
                        unit_price: item.unit_price
                    });
                } else {
                    products.push({
                        product_id: item.product_id,
                        product_name: item.product_name,
                        quantity: item.quantity,
                        unit_price: item.unit_price
                    });
                }
            } else {
                products.push({
                    product_id: exists.id,
                    product_name: exists.name,
                    quantity: item.quantity,
                    unit_price: item.unit_price
                });
            }
        }

        return products;
    };
};

export const receiptService = ReceiptService.getInstance();