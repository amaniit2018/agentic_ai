import { useEffect, useRef } from 'react';
import MessageInput from './message_input';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  handleSendMessage: (text: string) => void;
  isTyping: boolean;
}

const ChatWindow = ({ messages, handleSendMessage, isTyping }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-36">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              msg.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-3 max-w-lg rounded-2xl text-m ${
                msg.isUser
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
            <div ref={bottomRef} />
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-gray-500 px-4 mb-2">Agentic AI is typing...</div>
        )}

        <div ref={bottomRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white border-t border-gray-300 px-4 py-3">
        <div className="w-full max-w-3xl">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
