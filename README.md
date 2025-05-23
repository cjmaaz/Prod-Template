# Node.js Production Template

A comprehensive boilerplate template for production-ready Node.js applications.

## ⚠️ **Personal Note**

This project template reflects my personal preferences and development practices. It's designed to address challenges I've encountered in production environments, but may not fit everyone's needs or preferences. Feel free to adapt and modify it according to your specific requirements.

# Step-Step Guide
### Index
- [Initial Setup](#initial-setup)
- [Initial Express With Environment Setup](#express-environment-setup)
- [Logger Setup](#logger-with-pino-setup)


## Docs
[Link](https://github.com/cjmaaz/Prod-Template/blob/main/docs) to more markdown files for details about:
- [Folder Structure](https://github.com/cjmaaz/Prod-Template/blob/main/docs/folderStructure.md)
- [Database Operations](https://github.com/cjmaaz/Prod-Template/blob/main/docs/databaseOperation.md)
- [Router Params](https://github.com/cjmaaz/Prod-Template/blob/main/docs/routerParams.md)
- [Jest Overview](https://github.com/cjmaaz/Prod-Template/blob/main/docs/jestOverview.md)
- [Github Actions Overview](https://github.com/cjmaaz/Prod-Template/blob/main/docs/githubActionsOverview.md)

## Overview

This template provides a fully configured development environment with industry-standard tooling for building robust, maintainable Node.js applications ready for production deployment. It integrates essential components including advanced logging, testing frameworks, containerization, code quality enforcement, database connectivity, and CI/CD pipelines.

## Features

### Core Components

- **Node.js Environment**: Optimized for server-side JavaScript applications
- **MongoDB Integration**: NoSQL database connection using Mongoose ODM for elegant data modeling
- **Docker Support**: Containerization for consistent deployment across environments
- **GitHub Actions**: Automated CI/CD workflows

### Developer Experience

- **ESLint**: Code linting with custom plugins for enforcing code style and identifying potential issues
- **Jest**: Comprehensive testing framework for unit and integration tests
- **Commitlint**: Standardized commit message format enforcement
- **Husky**: Git hooks to prevent bad commits and pushes
- **lint-staged**: Run linters on git staged files to ensure quality

### Operations Ready

- **Advanced Logging**: Structured logging with Pino and Pino-Roll for log rotation and management
- **Environment Configuration**: Properly segregated configuration for different environments

## Getting Started

### Prerequisites

- Node.js (v22+)
- Docker and Docker Compose
- MongoDB (local instance or connection string)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/cjmaaz/Prod-Template.git
cd Prod-Template

# Install dependencies
npm i
```

### Development Workflow

```bash
# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

# Initial Setup

### **Generate the package.json**
```bash
# Fill the project details or use -y flag
npm init
```

### **Configure ESLint**
```bash
# Select options as per your needs
npm init @eslint/config@latest

# Install additional plugins (as dev dependencies)
npm i -D eslint-plugin-import eslint-plugin-unicorn @stylistic/eslint-plugin-js
```
Import the installed plugins and use `globalIgnores` to ignore folders/files.
```javascript
// eslint.config.js File

import { defineConfig, globalIgnores } from 'eslint/config';

// Additional plugins for enhanced linting capabilities
import unicornPlugin from 'eslint-plugin-unicorn';  
// Provides additional rules for better code quality
import importPlugin from 'eslint-plugin-import';  
// Rules for ES6+ import/export syntax
import stylisticJs from '@stylistic/eslint-plugin-js';  
// Style/formatting rules (alternative to Prettier)


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"],
    // Update the plugin object (for the JS files) to use the imported plugins
    plugins: { 
      js,
      import: importPlugin,  // Import/export syntax rules
      unicorn: unicornPlugin,  // Additional code quality rules
      '@stylistic/js': stylisticJs  // Code formatting rules 
    }, 
    extends: ["js/recommended"],
    settings: {
      // Configure import plugin to resolve modules correctly
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs"]  // Supported file extensions
        }
      },
      // Node.js specific settings
      "node": {
        tryExtensions: [".js", ".mjs", ".cjs"],  // Extensions to try when resolving imports
        version: ">=22.0.0"  // Minimum Node.js version for the project
      }
    },
  }
])
```
Add the globalIgnores into the `defineConfig` argument array:
```javascript
  // Files to be ignored by ESLint globally across all configurations
  globalIgnores([
    '.vscode/',       // VS Code configuration files
    '.prettierignore', // Prettier ignore files
    '.gitignore',     // Git ignore files
    'package-lock.json', // NPM lock file
    'node_modules/',  // Dependencies
    'dist/',          // Build output
    'build/',         // Alternative build output
    //'*.config.*'      // Configuration files (including this one)
  ]),
```
Add `ecmaVersion` and `sourceType` property to the `languageOptions` object for the js config.
```javascript
    languageOptions: {
      globals: globals.node, 
      ecmaVersion: 'latest',  // Use latest features
      sourceType: "module",  // Treat files as ES modules 
    } 
```

At last, configure rules as per your organization/team rule:
```javascript
// Commonly used rules, refer the file for full set of rules
rules:{
  "unicorn/filename-case": ["error", {  // Enforce consistent filename casing
    case: "camelCase",
    ignore: ["README.md"]  // Exceptions for common files
  }],
}
```

### **Setup Husky, Lint-Staged and Commitlint**
```bash
# Install the packages as dev dependencies
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional

# Initialize Husky
npx husky init

# Set commitlint script
npm pkg set scripts.commitlint="commitlint --edit"

# Create commitlint config `commitlint.config.js` file
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Setup `.husky/commit-msg` to run commitlint to verify commit message
# On Linux/MacOS
echo "npm run commitlint \$1" > .husky/commit-msg
# On Windows
echo "npm run commitlint `$1" > .husky/commit-msg
```
Now, add `lint-staged` command in pre-commit file.
```bash
# Comment npm test for now as we have not configured jest yet.
# npm test
npx lint-staged
```

At last, configure the `package.json` to add few more scripts and property for the lint-staged.
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
  },
  "lint-staged": {
    "*": "eslint --fix"
  },
}
```

## Initial Project Structure

```
├── .github/workflows     # GitHub Actions CI/CD configuration
├── .husky                # Git hooks
├── .vscode/settings.json # VSCode settings
├── .gitignore            # Git ignore file
├── .gitattributes        # Git Attributes
├── commitlint.config.js  # Commitlint Configuration
├── eslint.config.js      # Eslint Configuration
├── package.json          # Project metadata and dependencies
└── package-lock.json
```

# Express Environment Setup

### **Express, dotenvFlow and Cross Env Installation**

Setting up node environment variable does not work properly in windows machine from script, so we are going to use `cross-env`.
We'll be using `nodemon` to watch files and restart server in development environment.
We are going to use **multiple environment variables** based on for what purpose our app is running for.
Also, we are using `dotenv-flow` instead of `dotenv` as loading multiple files is just easier with it.

```bash

npm i express dotenv-flow chalk

# Install cross-env as dev dependencies as most servers aren't windows
npm i -D cross-env nodemon

```
Update the `package.json` file the dev script:
```json
{
  "script":{
    "dev":"cross-env NODE_ENV=development nodemon src/app.js"
  }
}
```
### Populate `.env` and `.env.development` files.
```bash
# Default .env variables
APP_NAME=node-prod-template
PORT=3000
LOG_LEVEL=info
LOG_FORMAT=json
LOG_FILE_ENABLED=true
LOG_MAX_SIZE=10m
LOG_RETENTION_DAYS=7
```
Write the `app` and `dotenvFlow` logic.

# Logger with `pino` Setup

## Logging

This template uses Pino for fast, structured logging and Pino-Roll for log rotation:

```javascript
// Example usage
const logger = import('./utils/logger');

logger.info('Application started');
logger.error({ err }, 'An error occurred');
```

### Pino Installation
We'll be installing `pino` with 2 of it's transport: `pino-pretty` and `pino-roll`.
```bash
npm i pino pino-pretty pino-roll
```

Logs are automatically rotated based on file size and retained according to configurable policies.

## Database

Mongoose provides a straightforward way to model application data:

```javascript
// Example model

```

## Testing

Jest is configured for comprehensive testing:

```javascript
// Example test

```

## Git Workflow

This template enforces code quality at every step:

1. Write code and tests
2. Stage changes
3. Pre-commit hooks run linting on staged files
4. Commit (commitlint validates message format)
5. Push (pre-push hooks run tests)

## License

[MIT](LICENSE)

---

Created by Maaz - Feel free to contribute or provide feedback!
