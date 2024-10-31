import chalk from 'chalk';
import readline from 'readline';
import {startChat} from '../utils/api.js';

export const chat = async (options) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [];
  console.log(chalk.blue(`\nStarting chat with ${options.model}. Type 'exit' to quit.\n`));

  const askQuestion = async () => {
    rl.question(chalk.yellow('You: '), async (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      messages.push({role: 'user', content: input});

      try {
        const response = await startChat(options.model, messages);
        const assistantMessage = response.message.content;
        messages.push({role: 'assistant', content: assistantMessage});
        console.log(chalk.green('\nAssistant: ') + assistantMessage + '\n');
      } catch (error) {
        console.error(chalk.red('Error in chat:', error.message));
      }

      askQuestion();
    });
  };

  askQuestion();
};
