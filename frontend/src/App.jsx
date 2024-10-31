import React, {useEffect} from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Settings from './components/Settings';
import ThemeToggle from './components/ThemeToggle';
import useStore from './store/settings';

export default function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Ollama Chat</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Settings />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <NewChat />
            <ChatList />
          </aside>

          <main className="md:col-span-3">
            <ChatWindow />
          </main>
        </div>
      </div>
    </div>
  );
}
