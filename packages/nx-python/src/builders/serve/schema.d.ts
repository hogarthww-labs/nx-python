import { JsonObject } from '@angular-devkit/core'
import { NxPythonTemplate } from '../../schematics/nx-python/schema';

export interface ServeBuilderSchema extends JsonObject {
  main?: string
  outputPath?: string
  cwd?: string
  cmd?: string
  templateType?: NxPythonTemplate
}