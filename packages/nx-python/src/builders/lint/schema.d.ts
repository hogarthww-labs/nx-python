import { JsonObject } from '@angular-devkit/core'

export interface LintBuilderSchema extends JsonObject {
  outputPath?: string
  main?: string
}