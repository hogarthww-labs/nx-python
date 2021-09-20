import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getCliOptions, runPythonCommand } from '../../utils/py-utils';

import { ServeBuilderSchema } from './schema';

export function runBuilder(
  options: ServeBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projMetadata = context.getProjectMetadata(context?.target?.project);
  return from(projMetadata).pipe(
    map((project) => {
      const mainFile = `${options.main}`;

      return runPythonCommand(
        context,
        'serve',
        [mainFile],
        getCliOptions(options),
        project
      );
    })
  );
}

export default createBuilder(runBuilder);
