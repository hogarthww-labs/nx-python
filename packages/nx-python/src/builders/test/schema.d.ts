import { JsonObject } from '@angular-devkit/core'

export interface TestBuilderSchema extends JsonObject {
  outputPath?: string
  main?: string
}