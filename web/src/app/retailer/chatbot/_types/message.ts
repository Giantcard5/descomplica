export interface IMessage {
    id: number;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
}
