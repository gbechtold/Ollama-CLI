import chalk from 'chalk';
import {listModels} from '../utils/api.js';

export const list = async () => {
  try {
    const models = await listModels();
    console.log(chalk.blue('\nAvailable Models:'));
    models.forEach((model) => {
      console.log(chalk.green(`\n• ${model.name}`));
      console.log(chalk.gray(`  Modified: ${model.modified_at}`));
      console.log(chalk.gray(`  Size: ${(model.size / 1024 / 1024).toFixed(2)} MB`));
    });
  } catch (error) {
    console.error(chalk.red('Failed to list models:', error.message));
  }
};
