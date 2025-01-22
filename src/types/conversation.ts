export interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
}
export interface ChatResponse {
    response: string;
    conversationId: string;
}