# 🐍 NxPy: Nx Python plugin

This project was generated using [Nx](https://nx.dev).

<p align="center">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="250">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/240px-Python-logo-notext.svg.png" width="170"/>
</p>

The `nx-python` plugin allows users to create a basic python application using `nx` commands. To add the plugin to your project, just follow these steps:

## Getting started

### Create a Nx Workspace

Before installing the `nx-python` plugin, it is required to have a pre-configured Nx Workspace . If you don't, then proceed to create a new one executing the following command:

```bash
npx create-nx-workspace python-workspace --preset=empty --cli=nx --nx-cloud true
cd python-workspace
```

### Install the `nx-python` plugin

```bash
yarn add -D @nx-python/nx-python
```

### Adding an application to our workspace

To create a new python application based on this plugin, please execute the following command:

```bash
nx g @nx-python/nx-python:app <app-name>
```

**Note:** Replace `<app-name>` with the name of your new application

### Advanced options

* `--tags` or `-t` list of tags for project (used for linting)
* `--directory` or `-d` A directory where the project is placed
* `--template` or `-f` python framework to use (f.ex `django` or `flask`, where `python` is used by default)

#### Create Flask app

```bash
nx g @nx-python/nx-python:app <app-name> --template flask
```

#### Create Django app

```bash
nx g @nx-python/nx-python:app <app-name> --template django
```

### Advanced configuration

The plugin supports [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) for global configuration.

Simply add a `.nx-pythonrc` file to the root of your monorepo.
Currently this configuration support specifying command options to be used

```json
{
  "python": "python3",
  "commands": {
    "serve": "flask run",
    "lint": "-m pylint",
    "test": "-m pytest",
  }
}
```

See `src/utils/commands.ts` for command examples

You can also specify project specific command overrides in `workspace.json` project entries or in `project.json` per project

```json
"my-app": {
  "python": "python3",
  "commands": {
    "serve": "flask run",
    "lint": "-m pylint",
    "test": "-m unittest discover -s ./ -p",
  }
}
```

## Usage

After creating the `<app-name>` application using the `nx-python` plugin. We can execute the build, lint, test and serve `nx commands` on this new application. Output will be stored on `dist/<app-name>/` directory.

### Building the app

The `build` command is going to compile all the python files inside `<app-name>` directory, using the `py_compile` native module.

```bash
nx build <app-name>
```

More information here: [py_compile](https://docs.python.org/3/library/py_compile.html)

### Linting the application

Unfortunately Python doesn't have a native linting module(yet!). `nx-python` uses the `Flake8` module to lint your application. It is required that you install this module beforehand. More info here: [Flake8](https://flake8.pycqa.org/en/latest/)

```bash
pip install Flake8
```

After that you can perform the lint process with:

```bash
nx lint <app-name>
```

### Serving the application

This is going to execute the main file in your python application.

```bash
nx serve <app-name>
```

### Testing your application

The `test` command is going to execute all the test units inside your python app. You can add new test unit files if you want, but there are two requirements that you must meet:

- The filename must include the prefix `test`
- Because we are using the native `unittest` python module to make our tests, you are going to create the tests based on this approach. More info here: [unittest](https://docs.python.org/3/library/unittest.html)

To test your python app, execute the command:

```bash
nx test <app-name>
```

## Contributing

🐍  All contributions are welcome. Make sure you follow the [code of conduct](CODE_OF_CONDUCT.md) in this repository.

## MIT License

Made with 💜 by [Code ON](https://codeon.rocks) | [Melvin Vega](https://github.com/melveg) & [Diana Rodriguez](https://github.com/sponsors/alphacentauri82)
