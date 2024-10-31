import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'german',
      model: 'llama3.1:8b',
      history: [],
      settings: {
        saveHistory: true,
        markdownExport: true,
      },
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setModel: (model) => set({ model }),
      addToHistory: (chat) => set((state) => ({
        history: [...state.history, { ...chat, id: Date.now() }]
      })),
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ollama-settings',
    }
  )
);

export default useStore;