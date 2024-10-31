import React, {useState, useRef, useEffect} from 'react';
import {marked} from 'marked';
import {Loader2} from 'lucide-react';
import useStore from '../store/settings';

const Message = ({message, isLoading}) => (
  <div className={`flex w-full mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`
      max-w-[80%] rounded-lg p-4 shadow-sm
      ${message.role === 'user' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}
    `}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Analysiere...</span>
        </div>
      ) : (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: marked(message.content, {breaks: true}),
          }}
        />
      )}
    </div>
  </div>
);

export default function ChatWindow() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamedContent, setCurrentStreamedContent] = useState('');
  const messagesEndRef = useRef(null);
  const {model, language} = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamedContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {role: 'user', content: input};
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentStreamedContent('');

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model,
          messages: [...messages, userMessage],
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const {value, done} = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;

          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              fullResponse += data.message.content;
              setCurrentStreamedContent(fullResponse);
            }
          } catch (error) {
            console.error('Error parsing chunk:', error);
          }
        }
      }

      setMessages((prev) => [...prev, {role: 'assistant', content: fullResponse}]);
      setCurrentStreamedContent('');

      if (useStore.getState().settings.saveHistory) {
        useStore.getState().addToHistory({
          timestamp: new Date().toISOString(),
          messages: [...messages, userMessage, {role: 'assistant', content: fullResponse}],
          model,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <Message key={index} message={message} isLoading={isLoading && index === messages.length - 1} />
        ))}
        {currentStreamedContent && (
          <Message message={{role: 'assistant', content: currentStreamedContent}} isLoading={false} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nachricht eingeben..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors 
                     duration-200 font-medium"
          >
            Senden
          </button>
        </div>
      </form>
    </div>
  );
}
