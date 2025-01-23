import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Message, Link, Action } from "../../types/conversation";


const MessageLinks = ({ links }: { links: Link[] }) => {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {links.map((link, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(link.url, '_blank')}
                    className="flex items-center gap-1"
                >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                </Button>
            ))}
        </div>
    );
};

const MessageActions = ({
    actions,
    onFeedbackClick
}: { actions: Action[]; onFeedbackClick: (value: string) => void }) => {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {actions.map((action, index) => (
                <div key={index} className="flex gap-2">
                    {action.options.map((option, optIndex) => (
                        <Button
                            key={optIndex}
                            variant="outline"
                            size="sm"
                            onClick={() => onFeedbackClick(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            ))
            }
        </div >
    )
}

interface ChatContainerProps {
    messages: Message[];
    onFeedbackClick: (value: string) => void;
}
const ChatContainer = ({ messages, onFeedbackClick }: ChatContainerProps) => {
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
                    >
                        <div>{message.structuredContent.text}</div>
                        {message.structuredContent.links && (
                            <MessageLinks links={message.structuredContent.links} />
                        )}
                        {message.structuredContent.actions && (
                            <MessageActions
                                actions={message.structuredContent.actions}
                                onFeedbackClick={onFeedbackClick}
                            />
                        )}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </>
    );
};

export default ChatContainer;