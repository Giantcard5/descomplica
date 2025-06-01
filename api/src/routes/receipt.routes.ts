import { Router, Request, Response } from 'express';
import multer from 'multer';

import { 
    receiptService
} from '../services/receipt.service';

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_request, file, callback) => {
        callback(null, true);
    }
});

router.post('/upload', upload.single('file'), async (request: Request, response: Response) => {
    if (!request.file) {
        return response.status(400).json({ message: 'No file uploaded' });
    };

    const receipt = await receiptService.analyzeReceipt(request.file);

    return response.json(receipt);
});

export const receiptRouter = router;