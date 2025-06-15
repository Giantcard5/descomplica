'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

import { Send, Bot, Share, Search, BarChart3, Lightbulb, Code } from 'lucide-react';

import { defaultMessages } from './_mock/defaultMessages';
import { IMessage } from './_types/message';

export default function ChatbotPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<IMessage[]>(defaultMessages);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const isFirstRender = messages.length === 0;
        messagesEndRef.current?.scrollIntoView({
            behavior: isFirstRender ? 'smooth' : 'auto',
        });
    }, [messages]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMessage: IMessage = {
            id: messages.length + 1,
            type: 'user',
            content: message.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    action: selectedAction,
                }),
            });

            const data = await response.json();

            const botResponse: IMessage = {
                id: messages.length + 2,
                type: 'bot',
                content: data.content,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleActionSelect = (action: string) => {
        setSelectedAction(selectedAction === action ? null : action);
    };

    return (
        <div className="flex flex-col justify-between h-[745px] max-w-7xl mx-auto">
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 pt-2 space-y-6"
                style={{ maxHeight: '612px' }}
            >
                {messages.map((msg) => (
                    <div key={msg.id} className="space-y-4">
                        {msg.type === 'user' ? (
                            <div className="flex justify-end">
                                <Badge
                                    variant="secondary"
                                    className="px-4 py-2 text-sm bg-muted max-w-[80%]"
                                >
                                    {msg.content}
                                </Badge>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="prose prose-sm max-w-none">
                                        {msg.content.split('\n').map((paragraph, index) => (
                                            <p
                                                key={index}
                                                className="text-foreground leading-relaxed mb-3 last:mb-0"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                </div>
                                <span className="text-sm ml-2">Assistant is typing...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="sticky p-6 z-10">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type something..."
                                    className="border-0 text-base p-0 h-auto min-h-[2rem] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    disabled={isTyping}
                                    rows={1}
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={
                                                selectedAction === 'research' ? 'default' : 'ghost'
                                            }
                                            size="sm"
                                            className={`gap-2 ${selectedAction !== 'research' && 'text-muted-foreground'}`}
                                            onClick={() => handleActionSelect('research')}
                                        >
                                            <Search className="h-4 w-4" />
                                            Research
                                        </Button>
                                        <Button
                                            variant={
                                                selectedAction === 'analyze' ? 'default' : 'ghost'
                                            }
                                            size="sm"
                                            className={`gap-2 ${selectedAction !== 'analyze' && 'text-muted-foreground'}`}
                                            onClick={() => handleActionSelect('analyze')}
                                        >
                                            <BarChart3 className="h-4 w-4" />
                                            Analyze
                                        </Button>
                                        <Button
                                            variant={
                                                selectedAction === 'brainstorm'
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            className={`gap-2 ${selectedAction !== 'brainstorm' && 'text-muted-foreground'}`}
                                            onClick={() => handleActionSelect('brainstorm')}
                                        >
                                            <Lightbulb className="h-4 w-4" />
                                            Brainstorm
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Share className="h-4 w-4" />
                                            Share
                                        </Button>
                                        <Button
                                            onClick={handleSend}
                                            size="sm"
                                            disabled={!message.trim() || isTyping}
                                            className="gap-2"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
