import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import useStore from '../store/settings';

export default function ChatWindow() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { model, language } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [...messages, userMessage],
          stream: false,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
      
      // Save to history if enabled
      if (useStore.getState().settings.saveHistory) {
        useStore.getState().addToHistory({
          timestamp: new Date().toISOString(),
          messages: [...messages, userMessage, data.message],
          model,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.'
      }]);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === 'user' ? 'ml-auto bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'
            } p-3 rounded-lg max-w-[80%]`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: marked(message.content, { breaks: true })
              }}
              className="prose dark:prose-invert max-w-none"
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}