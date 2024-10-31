// src/utils/markdown.js

export const chatToMarkdown = (chat) => {
  const {timestamp, messages, model} = chat;
  const date = new Date(timestamp).toLocaleString();

  let markdown = `# Chat Session\n\n`;
  markdown += `Date: ${date}\n`;
  markdown += `Model: ${model}\n\n`;
  markdown += `---\n\n`;

  messages.forEach((message) => {
    const role = message.role === 'user' ? '👤 User' : '🤖 Assistant';
    markdown += `### ${role}\n\n${message.content}\n\n`;
  });

  return markdown;
};

export const downloadMarkdown = (chat, filename) => {
  const markdown = chatToMarkdown(chat);
  const blob = new Blob([markdown], {type: 'text/markdown'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  // Ensure directory structure exists in filename
  const date = new Date(chat.timestamp);
  const yy = date.getFullYear().toString().slice(-2);
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');

  // Create directory if it doesn't exist
  const directory = `${yy}${mm}`;
  if (!filename) {
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');

    // Get first message for summary
    const firstMessage = chat.messages[0]?.content || '';
    const summary = firstMessage.length > 35 ? firstMessage.substring(0, 32) + '...' : firstMessage;

    // Clean summary for filename
    const cleanSummary = summary
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    filename = `${directory}/${yy}${mm}${dd}-${hh}${min}-${cleanSummary}.md`;
  }

  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
