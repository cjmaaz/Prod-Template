# Node.js Production Template

A comprehensive boilerplate template for production-ready Node.js applications.

## ⚠️ **Personal Note**

This project template reflects my personal preferences and development practices. It's designed to address challenges I've encountered in production environments, but may not fit everyone's needs or preferences. Feel free to adapt and modify it according to your specific requirements.

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

## Step-Step Guide

### Initialize the Project

```bash
# Generate the package.json
npm init
```

## Initial Project Structure

```
├── .github/workflows   # GitHub Actions CI/CD configuration
├── .husky              # Git hooks
├── src                 # Application source code
│   └── utils           # Utility functions
├── .gitignore          # Git ignore file
├── .gitattributes      # Git Attributes
├── package.json        # Project metadata and dependencies
└── package-lock.json
```

## Logging

This template uses Pino for fast, structured logging and Pino-Roll for log rotation:

```javascript
// Example usage

```

Logs are automatically rotated based on file size and retained according to configurable policies.

## Testing

Jest is configured for comprehensive testing:

```javascript
// Example test

```

## Database

Mongoose provides a straightforward way to model application data:

```javascript
// Example model

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
