/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ProjectGraphBuilder,
  ProjectGraph,
  ProjectGraphProcessorContext,
} from '@nrwl/devkit';

import * as path from 'path';

import { hasPythonFiles } from './has-python-files';

/**
 * Nx Project Graph plugin for go
 *
 * @param {import('@nrwl/devkit').ProjectGraph} graph
 * @param {import('@nrwl/devkit').ProjectGraphProcessorContext} context
 * @returns {import('@nrwl/devkit').ProjectGraph}
 */
export const processProjectGraph = (
  graph: ProjectGraph,
  context: ProjectGraphProcessorContext
): ProjectGraph<any> => {
  const builder = new ProjectGraphBuilder(graph);

  const projectNames = Object.keys(context.filesToProcess);

  const hasPythonCompiler = (project) => {
    const projectBuildOptions = project.targets['build'].options;
    return projectBuildOptions.compiler !== 'python';
  };

  const isPythonProject = (project) =>
    hasPythonCompiler(project) || hasPythonFiles(project.root);

  const pythonFileExtensions = ['py', '.pyw', 'pyi', '.json', '.toml', '.xml'];
  const isPythonFile = (file) =>
    pythonFileExtensions.includes(path.extname(file));

  const filterPythonFiles = (files: string[]) => files.filter(isPythonFile);

  projectNames.map((projName) => {
    const project = context.workspace.projects[projName];
    if (!isPythonProject(project)) return;
    const projFiles = projectNames[projName];
    const pythonFiles = filterPythonFiles(projFiles);
    builder.addNode({
      name: projName,
      type: 'python',
      data: {
        files: pythonFiles,
      },
    });
  });
  return builder.getUpdatedProjectGraph();
};
