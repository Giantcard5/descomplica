import fs from 'fs';
import path from 'path';

export const loadPrompt = (filename: string): string => {
    const filePath = path.join(__dirname, '..', 'prompts', filename);
    return fs.readFileSync(filePath, 'utf-8');
};