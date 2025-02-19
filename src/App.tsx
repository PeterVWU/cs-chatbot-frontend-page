// src/App.tsx
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ChatInterface from '@/components/chat/ChatInterface';

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChatInterface />
    </QueryClientProvider>
  );
}