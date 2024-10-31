import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import useStore from '../store/settings';
import { downloadMarkdown } from '../utils/markdown';

const ChatList = () => {
  const { history, clearHistory, settings } = useStore();

  const handleDownload = (chat) => {
    if (settings.markdownExport) {
      downloadMarkdown(chat);
    }
  };

  if (history.length === 0) {
    return (
      <div className="mt-4 p-4 text-center text-gray-500 dark:text-gray-400">
        No chat history
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {history.map((chat) => (
        <div 
          key={chat.id} 
          className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 flex justify-between items-center"
        >
          <div className="flex-1">
            <div className="text-sm font-medium">
              {new Date(chat.timestamp).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Model: {chat.model}
            </div>
          </div>
          
          <div className="flex gap-2">
            {settings.markdownExport && (
              <button
                onClick={() => handleDownload(chat)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="Download as Markdown"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-4 w-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      )}
    </div>
  );
};

export default ChatList;