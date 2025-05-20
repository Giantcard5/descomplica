import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Chatbot - Descomplica',
    description: 'Submit your sell-out data through our guided chatbot',
};

export default function ChatbotPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Chatbot Assistant</h2>
                <p className="text-muted-foreground">
                    Submit your sell-out data through our guided conversation.
                </p>
            </div>

            <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                    <CardTitle>Data Submission Assistant</CardTitle>
                    <CardDescription>
                        Our chatbot will guide you through the data submission process
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-[calc(100%-5rem)]">
                    <div className="flex-1 overflow-auto space-y-4 p-4 border rounded-md mb-4">
                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-3 rounded-lg">
                                <p>
                                    Hello! I'm your Descomplica assistant. I'll help you submit your
                                    sell-out data. Would you like to start a new submission?
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                                <p>Yes, I'd like to submit today's sales data.</p>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-3 rounded-lg">
                                <p>
                                    Great! Let's start with the basics. What date is this sell-out
                                    data for?
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                                <p>Today, May 12, 2025.</p>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-3 rounded-lg">
                                <p>
                                    Perfect! Now, let's add the products you sold today. What was
                                    the first product?
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Please include the product name, quantity, and price.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                                <p>Product A, 5 units, $10.99 each</p>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-3 rounded-lg">
                                <p>Added: 5 units of Product A at $10.99 each (total: $54.95).</p>
                                <p className="mt-2">
                                    Would you like to add another product or is that all for today?
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
