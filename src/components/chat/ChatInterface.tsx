// src/components/chat/ChatInterface.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Message, ChatResponse } from "../../types/conversation";
import ChatContainer from "./ChatContainer";


const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([{
        structuredContent: { text: "👋 Hi there! I'm your customer service assistant. How can I help you today?" },
        sender: 'bot',
        timestamp: Date.now(),
    }]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState<string | undefined>();

    const sendMessage = async (): Promise<ChatResponse> => {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: newMessage,
                conversationId,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return response.json();
    };

    const mutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: (data) => {
            setConversationId(data.conversationId);

            const botMessage: Message = {
                structuredContent: data.response,
                sender: 'bot',
                timestamp: Date.now(),
                intent: data.intent
            }
            setMessages(prev => [...prev, botMessage]);

            // for order or FAQ response add feedback message
            if (data.intent === 'get_order_data' || data.intent === 'general_inquiry') {
                const feedbackMessage: Message = {

                    structuredContent: {
                        text: "Was this response helpful?", actions: [{
                            type: 'feedback',
                            options: [{ label: 'Yes', value: 'helpful' }, { label: 'No', value: 'not_helpgful' }]
                        }],
                    },

                    sender: 'bot',
                    timestamp: Date.now() + 100,
                }
                setMessages(prev => [...prev, feedbackMessage]);
            }
            setNewMessage('');
        },
    });

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages(prev => [...prev, {
            structuredContent: { text: newMessage },
            sender: 'user',
            timestamp: Date.now(),
        }]);

        mutation.mutate();
    };

    const handleFeedbackClick = (value: string) => {
        console.log('Feedback clicked:', value);
        const message: string = value === 'helpful'
            ? "Yes, the answer was helpful"
            : "No, I need more help";
        setMessages(prev => [...prev, {
            structuredContent: { text: message },
            sender: 'user',
            timestamp: Date.now()
        }])
        setNewMessage(message)
        mutation.mutate();
    }

    return (
        <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col">
            <div className="p-4 border-b flex items-center gap-3">
                <h2 className="text-lg font-semibold text-center">Customer Support</h2>

            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                <ChatContainer messages={messages}
                    onFeedbackClick={handleFeedbackClick} />

                {mutation.isPending && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                            Typing...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                />
                <Button
                    type="submit"
                    size="icon"
                    disabled={mutation.isPending}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </Card>
    );
};

export default ChatInterface;