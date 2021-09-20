import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getCliOptions, runPythonCommand } from '../../utils/py-utils';

import { LintBuilderSchema } from './schema';

export function runBuilder(
  options: LintBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projMetadata = context.getProjectMetadata(context?.target?.project);
  return from(projMetadata).pipe(
    map((project) => {
      const root = project.root;
      // Route of python files
      const sources = `${root}/src/*.py`;

      // Executing linting using the flake8 module
      return runPythonCommand(
        context,
        'lint',
        [sources],
        getCliOptions(options),
        project
      );
    })
  );
}

export default createBuilder(runBuilder);
