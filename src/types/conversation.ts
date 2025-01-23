export interface Message {
    structuredContent: StructuredResponse;
    sender: 'user' | 'bot';
    timestamp: number;
    intent?: Intent;
}

export interface StructuredResponse {
    text: string;
    links?: Link[];
    actions?: Action[];
}

export interface Action {
    type: 'feedback' | 'other';
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
    | 'close'             // End conversation
    | 'need_order_number'  // Need order number
    | 'get_order_data'    // Contains/refers to order details
    | 'ticketing'         // Create support ticket/escalate
    | 'general_inquiry';  // Default/general questions
