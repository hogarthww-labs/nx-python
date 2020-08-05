import { BuilderContext } from '@angular-devkit/architect';
export declare function runPythonCommand(context: BuilderContext, command: 'build' | 'lint' | 'serve' | 'test', params: string[], options?: {
    cwd?: string;
    cmd?: string;
}): {
    success: boolean;
};
