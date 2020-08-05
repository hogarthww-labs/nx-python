import { BuilderContext } from '@angular-devkit/architect'
import { execSync } from 'child_process'

export function runPythonCommand(
  context: BuilderContext,
  command: 'build' | 'lint' | 'serve' | 'test',
  params: string[],
  options: { cwd?: string; cmd?: string } = {},
): { success: boolean } {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'python3'
  const cwd = options.cwd || process.cwd()

  let mutate_command = ""

  // Create the command to execute
  if(command=="serve")
    mutate_command = ""
  else if(command=="build")
    mutate_command = "-m py_compile"
  else if(command=="lint")
    mutate_command = "-m flake8"
  else if(command=="test")
    mutate_command = "-m unittest discover -s ./ -p"
  else
    mutate_command = command
    
  const execute = `${cmd} ${mutate_command} ${params.join(' ')}`

  try {
    context.logger.info(`Executing command: ${execute}`)
    execSync(execute, { cwd, stdio: [0, 1, 2] })
    return { success: true }
  } catch (e) {
    context.logger.error(`Failed to execute command: ${execute}`, e)
    return { success: false }
  }
}