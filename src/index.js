#!/usr/bin/env node

import {program} from 'commander';
import dotenv from 'dotenv';
import {chat} from './commands/chat.js';
import {list} from './commands/list.js';
import {generate} from './commands/generate.js';

dotenv.config();

program.version('1.0.0').description('CLI tool for interacting with Ollama');

program.command('list').description('List available models').action(list);

program
  .command('chat')
  .description('Start a chat with a model')
  .requiredOption('-m, --model <model>', 'Model to use')
  .action(chat);

program
  .command('generate')
  .description('Generate a completion')
  .requiredOption('-m, --model <model>', 'Model to use')
  .requiredOption('-p, --prompt <prompt>', 'Prompt to use')
  .action(generate);

program.parse(process.argv);
