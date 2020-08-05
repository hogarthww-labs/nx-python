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
import { NxPythonSchematicSchema } from './schema';

import { join, normalize } from 'path'

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
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ])
  );
}

export default function (options: NxPythonSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    updateWorkspace((workspace) => {
      const appProjectRoot = normalizedOptions.projectRoot
      const sourceRoot = `${appProjectRoot}/src`
      const project = workspace.projects
        .add({
          name: normalizedOptions.projectName,
          root: appProjectRoot,
          sourceRoot,
          projectType,
        })

        const options = {
          outputPath: join(normalize('dist'), appProjectRoot),
          main: join(project.sourceRoot,'hello.py'),
        }

        project.targets.add({
          name: 'build',
          builder: '@nx-python/nx-python:build',
          options
        })

        project.targets.add({
          name: 'serve',
          builder: '@nx-python/nx-python:serve',
          options: {
            main: join(project.sourceRoot,'hello.py'),
          },
        })

        project.targets.add({
          name: 'test',
          builder: '@nx-python/nx-python:test',
          options: {
            main: join(project.sourceRoot,'test_hello.py'),
          },
        })

        project.targets.add({
          name: 'lint',
          builder: '@nx-python/nx-python:lint',
          options: {
            main: join(project.sourceRoot,'hello.py'),
          },
        })

    }),
    addProjectToNxJsonInTree(normalizedOptions.projectName, {
      tags: normalizedOptions.parsedTags,
    }),
    addFiles(normalizedOptions),
  ]);
}
