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
echo "npm run commitlint \${1}" > .husky/commit-msg
```
Or (Windows,Mac/Linux):
```bash
echo "npx --no commitlint --edit `$1" > .husky/commit-msg
```
```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```