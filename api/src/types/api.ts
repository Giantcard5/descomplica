export interface IRequest {
    contents: Array<{
        parts: Array<
            | { text: string }
            | { inlineData: { mimeType: string; data: string } }
        >;
    }>;
}

export interface IResponse {
    candidates?: Array<{
        content?: {
            parts?: Array<{
                text?: string;
            }>;
        };
    }>;
    [key: string]: any;
}