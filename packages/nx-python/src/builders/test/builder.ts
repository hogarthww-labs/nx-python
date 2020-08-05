import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TestBuilderSchema } from './schema'
import { runPythonCommand } from '../../utils/py-utils'

export function runBuilder(options: TestBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
  return from(context.getProjectMetadata(context?.target?.project)).pipe(
    map((project) => {

      const root = project.root
      const sources = `${root}/src/*test*.py`

      return runPythonCommand(context, 'test', [sources])
    }),
  )
}

export default createBuilder(runBuilder)