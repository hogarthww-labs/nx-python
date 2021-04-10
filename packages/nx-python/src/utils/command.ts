import { CommandType } from '..';

export function getCorePythonExecuteCommand(
  cmd: string,
  command: CommandType,
  params: string[]
): string {
  let mutate_command = '';

  // Create the command to execute
  if (command == 'serve') mutate_command = '';
  else if (command == 'build') mutate_command = '-m py_compile';
  else if (command == 'lint') mutate_command = '-m flake8';
  else if (command == 'test') mutate_command = '-m unittest discover -s ./ -p';
  else mutate_command = command;

  return `${cmd} ${mutate_command} ${params.join(' ')}`;
}

export function getDjangoExecuteCommand(
  cmd: string,
  command: CommandType,
  params: string[]
): string {
  let mutate_command = '';

  // Create the command to execute
  if (command == 'serve') mutate_command = 'runserver';
  else if (command == 'build') mutate_command = 'check --deploy';
  else if (command == 'lint') mutate_command = '-m flake8';
  else if (command == 'test') mutate_command = '-m unittest discover -s ./ -p';
  else mutate_command = command;

  return `${cmd} ${params.join(' ')} ${mutate_command}`;
}
