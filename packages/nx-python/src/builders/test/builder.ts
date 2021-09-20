import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getCliOptions, runPythonCommand } from '../../utils/py-utils';

import { TestBuilderSchema } from './schema';

export function runBuilder(
  options: TestBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projMetadata = context.getProjectMetadata(context?.target?.project);
  return from(projMetadata).pipe(
    map((project) => {
      const root = project.root;
      const sources = `${root}/src/*test*.py`;

      return runPythonCommand(
        context,
        'test',
        [sources],
        getCliOptions(options),
        project
      );
    })
  );
}

export default createBuilder(runBuilder);
