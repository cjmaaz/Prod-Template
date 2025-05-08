# Prod-Template
## About
This app is created as template to follow few configuration personal to me, this may or may not be useful to anybody.
## Docs
[Link](https://github.com/cjmaaz/Prod-Template/blob/main/docs) to more markdown files for details about:
- [Folder Structure](https://github.com/cjmaaz/Prod-Template/blob/main/docs/folderStructure.md)
- [Database Operations](https://github.com/cjmaaz/Prod-Template/blob/main/docs/databaseOperation.md)
- [Router Params](https://github.com/cjmaaz/Prod-Template/blob/main/docs/routerParams.md)
- [Jest Overview](https://github.com/cjmaaz/Prod-Template/blob/main/docs/jestOverview.md)
- [Github Actions Overview](https://github.com/cjmaaz/Prod-Template/blob/main/docs/githubActionsOverview.md)

### Dev Initialization
Basic Initialization:
```bash
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```
Eslint Initialization:
```bash
npm init @eslint/config@latest
```
ESlint Plugins:
```bash
npm i -D eslint @eslint/js globals eslint-plugin-import eslint-plugin-unicorn @stylistic/eslint-plugin-js
```
Husky Config:
```bash
npx husky init
```
CommitLint:
```bash
npm pkg set scripts.commitlint="commitlint --edit"
```
ON Mac/Linux:
```bash
echo "npm run commitlint \$1" > .husky/commit-msg
```
ON Windows:
```bash
echo "npm run commitlint `$1" > .husky/commit-msg
```

## **Server Init**
Installing Server/Database package:
```bash
npm i express mongoose dotenv
```
Adding nodemon to observe file change and updating script in package.json:
```bash
npm i -D nodemon
```
## **Adding Logger**
Install below packages:
```bash
npm i pino pino-pretty dayjs
```
## **Setting Up Test Env**
Install jest and mongodb-memory-server:
```bash
npm i -D jest mongodb-memory-server
```