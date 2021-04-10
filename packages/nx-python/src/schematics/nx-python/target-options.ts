// TODO: remove `any` types later on

import { join, normalize } from 'path';
import { NxPythonTemplate } from './schema';

interface IProject {
  root?: string;
  sourceRoot?: string;
}

export function getServeOptions(
  templateType: NxPythonTemplate,
  project: IProject
): any {
  return {
    main: getMainFilePath(templateType, project),
    templateType,
  };
}

export function getBuildOptions(
  templateType: NxPythonTemplate,
  project: IProject,
  options: any
): any {
  return {
    outputPath: join(normalize('dist'), options.projectRoot),
    main: getMainFilePath(templateType, project),
    templateType,
  };
}

export function getTestOptions(
  templateType: NxPythonTemplate,
  project: IProject
): any {
  return {
    main: getTestMainFilePath(templateType, project),
    templateType,
  };
}

export function getLintOptions(
  templateType: NxPythonTemplate,
  project: IProject
): any {
  return {
    main: getMainFilePath(templateType, project),
    templateType,
  };
}

function getTestMainFilePath(template: NxPythonTemplate, project): string {
  return join(project.sourceRoot, 'test_hello.py');
}

function getMainFilePath(template: NxPythonTemplate, project): string {
  if (template === 'django') {
    return join(project.root, 'manage.py');
  }
  return join(project.sourceRoot, 'hello.py');
}
