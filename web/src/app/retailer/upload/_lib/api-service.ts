import { FetchService } from "./fetch-service";

class UploadService extends FetchService {
    private static instance: UploadService;

    private constructor() {
        super();
    };

    static getInstance(): UploadService {
        if (!UploadService.instance) {
            UploadService.instance = new UploadService();
        };
        return UploadService.instance;
    };

    async postUpload(formData: FormData) {
        if (!formData.get('file')) {
            throw new Error('No file uploaded');
        };

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
        };
    };
};

export const uploadService = UploadService.getInstance();