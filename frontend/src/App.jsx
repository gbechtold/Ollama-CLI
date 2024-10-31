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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Core local</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Settings />
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 space-y-6">
            <NewChat />
            <ChatList />
          </aside>

          {/* Main Chat Area */}
          <main className="md:col-span-3">
            <ChatWindow />
          </main>
        </div>
      </div>
    </div>
  );
}
