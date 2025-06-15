import { FetchService } from './fetch-service';

interface ReceiptItem {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
}

class UploadService extends FetchService {
    private static instance: UploadService;

    private constructor() {
        super();
    }

    static getInstance(): UploadService {
        if (!UploadService.instance) {
            UploadService.instance = new UploadService();
        }
        return UploadService.instance;
    }

    async postUpload(formData: FormData): Promise<ReceiptItem[]> {
        if (!formData.get('file')) {
            throw new Error('No file uploaded');
        }

        try {
            const response = await this.fetch('/api/receipts/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }
}

export const uploadService = UploadService.getInstance();
