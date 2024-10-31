# Ollama CLI

A command-line interface tool for interacting with Ollama, a local large language model server. This CLI provides easy access to Ollama's features including model management, chat interfaces, and text generation.

## 🚀 Features

- List available models
- Interactive chat with models
- Generate text completions
- YAML configuration support
- Pretty console output
- Error handling and logging
- Streaming response support

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm
- Ollama installed and running locally (default: http://localhost:11434)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/gbechtold/Ollama-CLI
cd ollama-cli
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
OLLAMA_API_URL=http://localhost:11434
```

4. Make the CLI executable:

```bash
chmod +x src/index.js
```

5. Create a global symlink:

```bash
npm link
```

## 🚀 Quickstart

### Check Available Models

List all models currently installed in your Ollama instance:

```bash
ollama-cli list
```

### Start a Chat Session

Begin an interactive chat with a specific model:

```bash
ollama-cli chat -m llama2
```

or with Code Llama for coding tasks:

```bash
ollama-cli chat -m codellama
```

### Generate Text Completions

Generate one-off completions without starting a chat:

```bash
ollama-cli generate -m llama2 -p "Write a haiku about programming"
```

## 📝 Common Use Cases

### 1. Code Assistant

Use Code Llama for programming help:

```bash
ollama-cli chat -m codellama
> Write a Python function to calculate Fibonacci numbers
```

### 2. Writing Assistant

Generate creative content:

```bash
ollama-cli generate -m llama2 -p "Write a short blog post about artificial intelligence"
```

### 3. Data Analysis

Get help with data analysis tasks:

```bash
ollama-cli chat -m llama2
> How do I analyze this CSV file using pandas?
```

### 4. Learning and Tutoring

Use it as a learning companion:

```bash
ollama-cli chat -m llama2
> Explain quantum computing in simple terms
```

### 5. Code Review

Get code review suggestions:

```bash
ollama-cli chat -m codellama
> Review this code snippet: [paste your code]
```

### 6. Translation

Translate text between languages:

```bash
ollama-cli generate -m llama2 -p "Translate 'Hello, how are you?' to Spanish, French, and German"
```

### 7. Brainstorming

Use it for ideation:

```bash
ollama-cli chat -m llama2
> Let's brainstorm names for a tech startup focused on sustainability
```

## 💡 Pro Tips

1. **Model Selection**

   - Use `codellama` for programming tasks
   - Use `llama2` for general conversation and writing
   - Use specialized models for specific domains

2. **Chat vs. Generate**

   - Use `chat` when you need context-aware conversation
   - Use `generate` for one-off completions

3. **Improved Results**
   - Be specific in your prompts
   - Provide context when needed
   - Use system prompts for specialized tasks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🐛 Troubleshooting

If you encounter any issues:

1. Ensure Ollama is running locally:

```bash
ollama serve
```

2. Check your .env configuration:

```bash
cat .env
# Should show: OLLAMA_API_URL=http://localhost:11434
```

3. Verify model availability:

```bash
ollama-cli list
```

4. For connection issues, try:

```bash
curl http://localhost:11434/api/tags
```
