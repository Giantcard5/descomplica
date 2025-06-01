export class ReceiptService {
    private static instance: ReceiptService;
    private readonly apiKey: string;
    private readonly apiUrl: string;

    private constructor() {
        this.apiKey = 'AIzaSyANAzlKLswzS-bx2mRe_R5xtYfn2ykeKMA';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
    }

    static getInstance(): ReceiptService {
        if (!ReceiptService.instance) {
            ReceiptService.instance = new ReceiptService();
        }
        return ReceiptService.instance;
    }

    public async fetchAPI(prompt: string) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': this.apiKey
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error fetching API:', error);
            throw error;
        }
    }

    async analyzeReceipt(receipt: string) {
        const cleanBase64 = receipt.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `
            Analyze the following receipt and extract the following information:
            - Total amount
            - Date
            - Time
            - Location
        `;

        const response = await this.fetchAPI(prompt);
    };
}

export const receiptService = ReceiptService.getInstance();