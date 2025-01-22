export interface Message {
    structuredContent: StructuredResponse;
    sender: 'user' | 'bot';
    timestamp: number;
}

export interface StructuredResponse {
    text: string;
    links?: Link[];
}

export interface Link {
    label: string;
    url: string;
    type: 'tracking' | 'faq' | 'other';
}

export interface ChatResponse {
    response: StructuredResponse;
    conversationId: string;
}