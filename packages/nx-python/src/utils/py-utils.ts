import { BuilderContext } from '@angular-devkit/architect'
import { execSync } from 'child_process'
import { ServeBuilderSchema } from '../builders/serve/schema'
import { CommandType } from '..';
import { getCorePythonExecuteCommand, getDjangoExecuteCommand } from './command';

export function runPythonCommand(
  context: BuilderContext,
  command: CommandType,
  params: string[],
  options: ServeBuilderSchema = {},
): { success: boolean; } {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'python3'
  const cwd = options.cwd || process.cwd()
  // let execute = '';
  const commandExecutor = {
    default: getCorePythonExecuteCommand,
    django: getDjangoExecuteCommand
  };

  if(!commandExecutor[options.templateType]) {
    throw new Error('Invalid template type!');
  }

  const execute = commandExecutor[options.templateType](cmd, command, params);
  try {
    context.logger.info(`Executing command: ${execute}`)
    execSync(execute, { cwd, stdio: [0, 1, 2] })
    return { success: true }
  } catch (e) {
    context.logger.error(`Failed to execute command: ${execute}`, e)
    return { success: false }
  }
}

export function getCliOptions(options: ServeBuilderSchema): ServeBuilderSchema {
  const _options: ServeBuilderSchema = {...options};
  if(options.cmd) {
    _options.cmd = options.cmd;
  }
  if(options.cwd) {
    _options.cwd = options.cwd;
  }
  return _options;
}