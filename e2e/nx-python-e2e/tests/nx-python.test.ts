import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-python e2e', () => {
  it('should create nx-python', async (done) => {
    const plugin = uniq('nx-python');
    ensureNxProject('@nx-python/nx-python', 'dist/packages/nx-python');
    await runNxCommandAsync(`generate @nx-python/nx-python:app ${plugin}`);

    const resultBuild = await runNxCommandAsync(`build ${plugin}`)
    expect(resultBuild.stdout).toContain(`Executing command: python3 -m py_compile`)

    const resultLint = await runNxCommandAsync(`lint ${plugin}`)
    expect(resultLint.stdout).toContain(`Executing command: python3 -m flake8 apps/${plugin}/src/*.py`)

    const resultServe = await runNxCommandAsync(`serve ${plugin}`)
    expect(resultServe.stdout).toContain(`Executing command: python3`)

    const resultTest = await runNxCommandAsync(`test ${plugin}`)
    expect(resultTest.stdout).toContain(`Executing command: python3 -m unittest discover -s ./ -p apps/${plugin}/src/*test*.py`)

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-python');
      ensureNxProject('@nx-python/nx-python', 'dist/packages/nx-python');
      await runNxCommandAsync(
        `generate @nx-python/nx-python:app ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/src/hello.py`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-python');
      ensureNxProject('@nx-python/nx-python', 'dist/packages/nx-python');
      await runNxCommandAsync(
        `generate @nx-python/nx-python:app ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
