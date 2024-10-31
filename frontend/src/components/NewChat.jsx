import React from 'react';
import { Plus } from 'lucide-react';
import useStore from '../store/settings';

const NewChat = () => {
  const resetMessages = useStore((state) => state.resetMessages);

  return (
    <button
      onClick={resetMessages}
      className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
    >
      <Plus className="w-5 h-5" />
      New Chat
    </button>
  );
};

export default NewChat;