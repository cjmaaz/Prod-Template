# Prod-Template
## About
This app is created as template to follow few configuration personal to me, this may or may not be useful to anybody.
### Dev Initialization
Basic Initialization:
```bash
npm i -D husky prettier lint-staged @commitlint/cli @commitlint/config-conventional
```
Eslint Initialization:
```bash
npm init @eslint/config@latest
```
ESlint Plugin and Prettier Config:
```bash
npm i -D eslint-config-prettier eslint-plugin-import @stylistic/eslint-plugin eslint-plugin-unicorn
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
echo "npm run commitlint `${1}" > .husky/commit-msg
```