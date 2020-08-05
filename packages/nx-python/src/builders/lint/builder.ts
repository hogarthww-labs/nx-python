import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LintBuilderSchema } from './schema'
import { runPythonCommand } from '../../utils/py-utils'

export function runBuilder(options: LintBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
  return from(context.getProjectMetadata(context?.target?.project)).pipe(
    map((project) => {
      const root = project.root
      // Route of python files
      const sources = `${root}/src/*.py`

      // Executing linting using the flake8 module
      return runPythonCommand(context, 'lint', [sources])
    }),
  )
}

export default createBuilder(runBuilder)