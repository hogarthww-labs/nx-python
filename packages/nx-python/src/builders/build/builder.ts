import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { getCliOptions, runPythonCommand } from '../../utils/py-utils';

import { BuildBuilderSchema } from './schema';

export function runBuilder(
  options: BuildBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projMetadata = context.getProjectMetadata(context?.target?.project);
  return from(projMetadata).pipe(
    map((project) => {
      const mainFile = `${options.main}`;
      const output = `${options.outputPath}`;
      //Compile files using the native py_compile module
      return runPythonCommand(
        context,
        'build',
        [mainFile],
        getCliOptions(options),
        project
      );
    })
  );
}

export default createBuilder(runBuilder);
