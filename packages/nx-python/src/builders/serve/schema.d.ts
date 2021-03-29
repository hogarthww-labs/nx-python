import { JsonObject } from '@angular-devkit/core'

export interface ServeBuilderSchema extends JsonObject {
  main?: string
  outputPath?: string
  cwd?: string
  cmd?: string
}