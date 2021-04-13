export type NxPythonTemplate = 'default' | 'django' | 'flask';
export interface NxPythonSchematicSchema {
  name: string;
  tags?: string;
  directory?: string;
  template?: NxPythonTemplate;
}
