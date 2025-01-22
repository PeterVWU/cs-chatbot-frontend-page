import { useEffect, useRef } from 'react';
import { Message } from "../../types/conversation";

const ChatContainer = ({ messages }: { messages: Message[] }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (

        <>
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${message.sender === 'user'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-900'
                            }`}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                    >
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </>
    );
};

export default ChatContainer;