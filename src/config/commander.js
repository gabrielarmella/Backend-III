import { Command } from 'commander';

const program = new Command();

program
  .option('-l, --logger <type>', 'specify logger type', 'DEVELOPMENT');

program.parse(process.argv);

export const option = program.opts();

