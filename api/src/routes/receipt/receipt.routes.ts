import { 
    Router, 
    Request, 
    Response 
} from 'express';

import multer from 'multer';

import { 
    receiptService
} from '../../services/receipt/receipt.service';

import similarityService from '../../services/receipt/similarity.service';

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_request, file, callback) => {
        callback(null, true);
    }
});

router.post('/upload', upload.single('file'), async (request: Request, response: Response) => {
    const accessToken = request.cookies.access_token;

    if (!accessToken) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    if (!request.file) {
        return response.status(400).json({ message: 'No file uploaded' });
    };

    const receipt = await receiptService.analyzeReceipt(request.file, request.body.method, accessToken);

    return response.json(receipt);
});

// For testing purposes
router.get('/similarity', async (request: Request, response: Response) => {
    const { item1, item2 } = request.body;

    const similarity = await similarityService.getSimilarity(item1, item2);

    return response.json({ similarity });
});

export const receiptRouter = router;