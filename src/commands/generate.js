import chalk from 'chalk';
import {generateCompletion} from '../utils/api.js';

export const generate = async (options) => {
  try {
    console.log(chalk.blue('\nGenerating completion...'));
    console.log(chalk.gray(`Using model: ${options.model}`));

    const result = await generateCompletion(options.model, options.prompt);
    console.log(chalk.green('\nResponse:'));
    console.log(result.response);
  } catch (error) {
    console.error(chalk.red('Failed to generate completion:', error.message));
  }
};
