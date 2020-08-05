import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { NxPythonSchematicSchema } from './schema';

describe('nx-python schematic', () => {
  let appTree: Tree;
  const options: NxPythonSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nx-python/nx-python',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('nx-python', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
