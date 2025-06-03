import { IReceiptItem } from "./receipt";

export interface ISuggestion {
    item: IReceiptItem;
    suggestion: string;
};