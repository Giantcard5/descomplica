import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chatbot - Descomplica',
    description: 'Chat with our AI assistant to get help with your data submissions',
};

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <div className="sticky bg-background border-b border-border pb-6">
                <h2 className="text-2xl font-bold tracking-tight">Chatbot</h2>
                <p className="text-muted-foreground">
                    Chat with our AI assistant to get help with your data submissions.
                </p>
            </div>

            {children}
        </div>
    );
}
