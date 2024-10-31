import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings as SettingsIcon } from 'lucide-react';
import useStore from '../store/settings';

const Settings = () => {
  const { model, language, settings, setModel, setLanguage, updateSettings } = useStore();
  const [open, setOpen] = useState(false);

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSettingChange = (key) => (e) => {
    updateSettings({ [key]: e.target.checked });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <SettingsIcon className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your chat preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <select 
              value={model} 
              onChange={handleModelChange}
              className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="llama3.1:8b">Llama 3.1 (8B)</option>
              <option value="codellama">Code Llama</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className="w-full p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="german">German</option>
              <option value="english">English</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.saveHistory}
                onChange={handleSettingChange('saveHistory')}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Save chat history</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.markdownExport}
                onChange={handleSettingChange('markdownExport')}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Enable Markdown export</span>
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;