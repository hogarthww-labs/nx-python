import { JsonObject } from '@angular-devkit/core';
import { BuilderContext } from '@angular-devkit/architect';

import { execSync } from 'child_process';

import { ServeBuilderSchema } from '../builders/serve/schema';

import { CommandType } from '..';
import { getExecuteCommand } from './command';

export function runPythonCommand(
  context: BuilderContext,
  command: CommandType,
  params: string[],
  options: ServeBuilderSchema = {},
  projectMetadata: JsonObject
): { success: boolean } {
  // Take the parameters or set defaults
  const pythonRuntime = projectMetadata.python || 'python3';
  const cmd = options.cmd || pythonRuntime;
  const cwd = options.cwd || process.cwd();

  const execute = getExecuteCommand(
    cmd as string,
    command,
    params,
    projectMetadata
  );
  try {
    context.logger.info(`Executing command: ${execute}`);
    execSync(execute, { cwd, stdio: [0, 1, 2] });
    return { success: true };
  } catch (e) {
    context.logger.error(`Failed to execute command: ${execute}`, e);
    return { success: false };
  }
}

export function getCliOptions(options: ServeBuilderSchema): ServeBuilderSchema {
  const _options: ServeBuilderSchema = { ...options };
  if (options.cmd) {
    _options.cmd = options.cmd;
  }
  if (options.cwd) {
    _options.cwd = options.cwd;
  }
  return _options;
}
