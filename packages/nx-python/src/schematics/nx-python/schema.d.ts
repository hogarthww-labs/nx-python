export type NxPythonTemplate = 'default' | 'django' | 'flask';
export interface NxPythonSchematicSchema {
  name: string;
  tags?: string;
  description?: string;
  repoUrl?: string;
  directory?: string;
  template?: NxPythonTemplate;
}
