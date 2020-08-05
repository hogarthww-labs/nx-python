import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ServeBuilderSchema } from './schema'
import { runPythonCommand } from '../../utils/py-utils'

export function runBuilder(options: ServeBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
  return from(context.getProjectMetadata(context?.target?.project)).pipe(
    map(() => {
      const mainFile = `${options.main}`

      return runPythonCommand(context, 'serve', [mainFile])
    }),
  )
}

export default createBuilder(runBuilder)