# Angular Signal State Management

## Description

This application serves as a demo for the usage of Angular Signals
as a State Management Solution.

## Requirements:

| Name               | Version |
| ------------------ | ------- |
| Angular CLI        | 18.0.5  |
| Node               | 20.14.0 |
| npm                | 10.7.0  |
| TypeScript         | 5.4.2   |
| Git Bash (Windows) | 5.2.26  |

## Project setup

### Generating the app

For generating this application the following command was used:

```shell
ng new signal-client --skip-git --standalone --strict --routing=true --prefix app --style scss --inline-template false --inline-style false --directory ./
```

Click [here](https://angular.io/cli/new) for more info about these flags.

### Development server

Run `npm run start:dev` for a dev server. Navigate to `http://localhost:4200`.
The application will automatically reload if you change any of the source files.

### Build

Run `npm run build` or `npm run build:dev` to build the project. The build artifacts will be stored
in the `dist/` directory.

#### Production Build / Deployment

To ensure proper deployment to production, it's essential to run the `npm run prepare:prod`
script before deploying your application.

### Setting Up Git Bash for Windows

Bash is required for some scripts that Husky uses. To ensure Husky's Git hooks
work correctly on Windows, follow these steps:

#### Install Git Bash

Download and install Git Bash from the official Git website:
[Git Downloads](https://git-scm.com/downloads)

#### Adjust PATH Environment Variable

After installing Git Bash:

- In the "**Environment Variables**" dialog, under "**System variables**", find the
  **Path variable**, select it, and click "**Edit...**".
- Add the path to Git Bash (`C:\Program Files\Git\bin` by default) to the list of paths.
- Restart _(optional)_

#### Fix GitHub Desktop not being able to use Bash:

Add `C:\Program Files\Git\bin` to Path for both variable types: User and System -
and put it before `"%SystemRoot%\system32"`.

If that does not work try changing `npm` to `npm.cmd` in `C:\Program Files\nodejs`.

### Linting and Formatting

This Angular project is configured with [Prettier](https://prettier.io/) as the
code formatter and [ESLint](https://github.com/angular-eslint/angular-eslint) as the linter to
maintain code quality and consistency.

#### Setting Up Prettier and ESLint in Visual Studio Code

To set up Prettier and ESLint in Visual Studio Code for this project, follow these steps:

##### Running these tools from the terminal

- ESLint: `npm run lint`
- Prettier: `npm run prettier`
- **Both ESLint and Prettier:** `npm run pretty-lint`

##### Install VS Code Extensions

- Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Install the [Prettier - Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

##### Configure VS Code

Open your VS Code settings (Ctrl/Cmd + ,), and add or modify the following settings in your settings.json file:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "eslint.validate": ["typescript"]
}
```

