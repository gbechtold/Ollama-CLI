import React from 'react';
import {Download, Trash2, MessageCircle} from 'lucide-react';
import useStore from '../store/settings';
import {downloadMarkdown} from '../utils/markdown';

const ChatList = () => {
  const {history, clearHistory, settings} = useStore();

  const handleDownload = (chat) => {
    if (settings.markdownExport) {
      downloadMarkdown(chat);
    }
  };

  const getSummary = (chat) => {
    const firstMessage = chat.messages[0]?.content || '';
    return firstMessage.length > 35 ? firstMessage.substring(0, 32) + '...' : firstMessage;
  };

  if (history.length === 0) {
    return (
      <div className="mt-4 p-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No chat history yet</p>
        <p className="text-sm mt-2">Start a new conversation!</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* Scrollable Container */}
      <div className="max-h-[60vh] overflow-y-auto space-y-3 mb-4">
        {history.map((chat) => (
          <div
            key={chat.id}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 transition-colors duration-200 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-sm font-medium mb-1" title={new Date(chat.timestamp).toLocaleString()}>
                  {getSummary(chat)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {chat.model}
                </div>
              </div>

              <div className="flex gap-2">
                {settings.markdownExport && (
                  <button
                    onClick={() => handleDownload(chat)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Download as Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear History Button - Outside of scroll container */}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="w-full p-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      )}
    </div>
  );
};

export default ChatList;
