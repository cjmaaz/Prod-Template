# Prod-Template
## About
This app is created as template to follow few configuration personal to me, this may or may not be useful to anybody.
### Dev Initialization
Basic Initialization:
```bash
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```
Eslint Initialization:
```bash
npm init @eslint/config@latest
```
ESlint Plugins::
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
echo "npm run commitlint \${1}" > .husky/commit-msg
```
ON Windows:
```bash
echo "npm run commitlint `$1" > .husky/commit-msg
```