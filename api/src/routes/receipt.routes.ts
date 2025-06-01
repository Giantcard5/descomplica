import { Router, Request, Response } from 'express';
import multer from 'multer';

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_request, file, callback) => {
        callback(null, true);
    }
});

router.post('/upload', upload.single('file'), (request: Request, response: Response) => {
    console.log('Uploaded file:', request.file);

    if (!request.file) {
        return response.status(400).json({ message: 'No file uploaded' });
    };

    response.json({ message: 'File received', file: request.file, fields: request.body });
});

export const receiptRouter = router;