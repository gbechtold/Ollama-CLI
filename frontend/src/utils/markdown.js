export const chatToMarkdown = (chat) => {
  const { timestamp, messages, model } = chat;
  const date = new Date(timestamp).toLocaleString();
  
  let markdown = `# Chat Session\n\n`;
  markdown += `Date: ${date}\n`;
  markdown += `Model: ${model}\n\n`;
  markdown += `---\n\n`;
  
  messages.forEach(message => {
    const role = message.role === 'user' ? '👤 User' : '🤖 Assistant';
    markdown += `### ${role}\n\n${message.content}\n\n`;
  });
  
  return markdown;
};

export const downloadMarkdown = (chat) => {
  const markdown = chatToMarkdown(chat);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-${new Date(chat.timestamp).toISOString().split('T')[0]}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};