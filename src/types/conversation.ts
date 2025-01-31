export interface Message {
    structuredContent: StructuredResponse;
    sender: 'user' | 'bot';
    timestamp: number;
    intent?: Intent;
}

export interface StructuredResponse {
    text: string;
    links?: Link[];
    action?: Action;
}

export interface Action {
    type: 'feedback' | 'ticket';
    options: ActionOption[];
}

export interface ActionOption {
    label: string;
    value: string;
}

export interface Link {
    label: string;
    url: string;
    type: 'tracking' | 'faq' | 'other';
}

export interface ChatResponse {
    response: StructuredResponse;
    conversationId: string;
    intent: Intent;
}
export type Intent =
    | 'order'             // order related
    // | 'product'           // product related
    // | 'payment'           // payment related
    // | 'shipping'          // shipping related
    // | 'return'            // return related
    // | 'cancel'            // cancel related
    | 'other'             // other related
    | 'ticketing'