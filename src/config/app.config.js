import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import dotenvFlow from 'dotenv-flow';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envDir = resolve(__dirname, '../../env/');

const { NODE_ENV = 'development' } = process.env;

const result = dotenvFlow.config({
  node_env: NODE_ENV,
  default_node_env: 'development',
  path: envDir,
  silent: false
});

if (result.error) {
  console.error(chalk.red(`Env Load failed: ${result.error.message}`));
  process.exit(1);
}
if (result.parsed) {
  console.info(chalk.green(`Env Loaded Successfully`));
  if (typeof result.parsed.DEBUG === 'string' && result.parsed.DEBUG === 'true') {
    console.info(result.parsed);
  }
}
