import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuildBuilderSchema } from './schema';
import { getCliOptions, runPythonCommand } from '../../utils/py-utils'

export function runBuilder(
  options: BuildBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(context.getProjectMetadata(context?.target?.project)).pipe(
    map(() => {
      const mainFile = `${options.main}`
      const output = `${options.outputPath}`
      //Compile files using the native py_compile module
      return runPythonCommand(context, 'build', [mainFile], getCliOptions(options))
    })
  );
}

export default createBuilder(runBuilder);
