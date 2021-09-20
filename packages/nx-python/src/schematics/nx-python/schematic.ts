import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  url,
} from '@angular-devkit/schematics';

import {
  addProjectToNxJsonInTree,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateWorkspace,
} from '@nrwl/workspace';

import { NxPythonSchematicSchema, NxPythonTemplate } from './schema';
import {
  getBuildOptions,
  getLintOptions,
  getServeOptions,
  getTestOptions,
} from './target-options';

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
//const projectType = ProjectType.Library;
const projectType = ProjectType.Application;

interface NormalizedSchema extends NxPythonSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(options: NxPythonSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(getTemplateFilesPath(options.template)), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ])
  );
}

function getTemplateFilesPath(template: NxPythonTemplate) {
  if (template === 'django') {
    return `./files/django`;
  }
  if (template === 'flask') {
    return `./files/flask`;
  }
  return `./files/default`;
}

export default function (options: NxPythonSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    updateWorkspace((workspace) => {
      const appProjectRoot = normalizedOptions.projectRoot;
      const sourceRoot = `${appProjectRoot}/src`;
      const project = workspace.projects.add({
        name: normalizedOptions.projectName,
        root: appProjectRoot,
        sourceRoot,
        projectType,
      });

      project.targets.add({
        name: 'build',
        builder: '@nx-python/nx-python:build',
        options: getBuildOptions(
          normalizedOptions.template,
          project,
          normalizedOptions
        ),
      });

      project.targets.add({
        name: 'serve',
        builder: '@nx-python/nx-python:serve',
        options: getServeOptions(normalizedOptions.template, project),
      });

      project.targets.add({
        name: 'test',
        builder: '@nx-python/nx-python:test',
        options: getTestOptions(normalizedOptions.template, project),
      });

      project.targets.add({
        name: 'lint',
        builder: '@nx-python/nx-python:lint',
        options: getLintOptions(normalizedOptions.template, project),
      });
    }),
    addProjectToNxJsonInTree(normalizedOptions.projectName, {
      tags: normalizedOptions.parsedTags,
    }),
    addFiles(normalizedOptions),
  ]);
}
