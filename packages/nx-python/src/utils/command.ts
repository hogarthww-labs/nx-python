/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonObject } from '@angular-devkit/core';

import { cosmiconfigSync } from 'cosmiconfig';

import { CommandType } from '..';

const testers = {
  pytest: '-m pytest',
  unittest: '-m unittest discover -s ./ -p',
};

const linters = {
  pylint: '-m pylint',
  flake8: '-m flake8',
  mypy: '-m mypy',
};

const builders = {
  default: '-m py_compile',
  numba: '-m numba',
  cython: 'build_ext --inplace',
};

const defaults: any = {
  python: {
    serve: ' ',
    build: builders.default,
    lint: linters.flake8,
    test: testers.unittest,
  },
};

defaults.django = {
  ...defaults.python,
  serve: 'runserver',
};

defaults.flask = {
  ...defaults.python,
  pyServe: 'flask run',
};

export function getExecuteCommand(
  cmd: string,
  command: CommandType,
  params: string[],
  projectMetadata: JsonObject
): string {
  let mutate_command = '';
  const explorerSync = cosmiconfigSync('nx-python');
  const { config } = explorerSync.search('commands');
  const projCommands = (projectMetadata.commands as any) || {};
  const commandsObj = {
    ...config,
    ...projCommands,
  };
  const projectType: string = (projectMetadata.projectType as any) || 'python';
  const pyOpts = {
    ...defaults[projectType],
    ...commandsObj,
  };

  // Create the command to execute
  mutate_command = pyOpts[command] || command;
  return `${cmd} ${mutate_command} ${params.join(' ')}`;
}
