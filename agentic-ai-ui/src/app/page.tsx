"use client";
import { useState } from 'react';
import ChatWindow from './component/chatwindow';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hey! I’m your smart assistant—need help debugging, researching, or building something cool?',
      isUser: false,
    },
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = { text, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post('/api/chat', { message: text });

      const botMessage: Message = {
        text: response.data.reply,
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const botMessage: Message = {
        text: "Sorry, I'm having trouble processing your request.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }


    setIsTyping(false);
  };


  return (
    <div className="h-screen flex flex-col">
      <header className="bg-[#141414] text-white  py-6 text-center shadow-md fixed top-0 left-0 right-0 z-10  pl-4 pr-4 border-b border-[#2b2b2b]">
        <h1 className="text-xl font-semibold">AGENTIC AI</h1>
      </header>

      <div className="flex-1 flex justify-center pt-[100px]">
        <div className="w-full max-w-3xl flex flex-col">
          <ChatWindow
            messages={messages}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
