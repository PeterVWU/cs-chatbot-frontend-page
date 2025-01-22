// src/components/chat/ChatInterface.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { Message, ChatResponse } from "../../types/conversation";
import ChatContainer from "./ChatContainer";


const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
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
            setMessages(prev => [...prev, {
                text: data.response,
                sender: 'bot',
                timestamp: Date.now(),
            }]);
            setNewMessage('');
        },
    });

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages(prev => [...prev, {
            text: newMessage,
            sender: 'user',
            timestamp: Date.now(),
        }]);

        mutation.mutate();
    };

    return (
        <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col">
            <div className="p-4 border-b flex items-center gap-3">
                {/* <Avatar className="h-8 w-8">
                    <AvatarImage src="/support-avatar.png" />
                    <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">Sofia Davis</div>
                    <div className="text-sm text-gray-500">m@example.com</div>
                </div> */}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                <ChatContainer messages={messages} />
                {/* {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${message.sender === 'user'
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-900'
                                }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))} */}
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