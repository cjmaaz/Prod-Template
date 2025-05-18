import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
// Additional plugins for enhanced linting capabilities
import unicornPlugin from 'eslint-plugin-unicorn';  // Provides additional rules for better code quality
import importPlugin from 'eslint-plugin-import';  // Rules for ES6+ import/export syntax
import stylisticJs from '@stylistic/eslint-plugin-js';  // Style/formatting rules (alternative to Prettier)
import { defineConfig, globalIgnores } from 'eslint/config';


export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      import: importPlugin,  // Import/export syntax rules
      unicorn: unicornPlugin,  // Additional code quality rules
      '@stylistic/js': stylisticJs  // Code formatting rules
    },
    extends: ['js/recommended'],
    settings: {
      // Configure import plugin to resolve modules correctly
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs']  // Supported file extensions
        }
      },
      // Node.js specific settings
      'node': {
        tryExtensions: ['.js', '.mjs', '.cjs'],  // Extensions to try when resolving imports
        version: '>=22.0.0'  // Minimum Node.js version for the project
      }
    },
    rules: {
      'camelcase': ['error', { properties: 'never' }],  // Use camelCase but don't enforce on properties
      'require-await': 'error',  // Disallow async functions with no await expressions
      'no-constant-binary-expression': 'error',  // Disallows expressions that are always true/false
      'no-duplicate-imports': 'error',  // Prevents importing from the same module multiple times
      'no-constructor-return': 'error',  // Prevents returning values from constructors
      'no-promise-executor-return': 'error',  // Prevents returning values from Promise constructors
      'no-self-compare': 'error',  // Prevents comparing a variable with itself
      'no-unmodified-loop-condition': 'error',  // Prevents infinite loops due to unmodified conditions
      'no-unreachable-loop': 'error',  // Prevents loops that will never iterate
      'no-unused-private-class-members': 'error',  // Prevents unused private fields
      'no-unused-vars': ['warn', {  // Warns about unused variables but with exceptions
        argsIgnorePattern: '^_',  // Ignore parameters starting with underscore
        varsIgnorePattern: '^_',  // Ignore variables starting with underscore
        caughtErrorsIgnorePattern: '^_'  // Ignore caught errors starting with underscore
      }],
      'no-use-before-define': ['error', {  // Prevents using variables before they are defined
        functions: false,  // Allow function hoisting
        classes: true,     // Don't allow classes to be used before definition
        variables: true    // Don't allow variables to be used before definition
      }],
      'require-atomic-updates': 'error',  // Prevents race conditions with async functions
      'default-case-last': 'error',  // Default case should be the last case in switch
      'default-param-last': 'error',  // Default parameters should be last in function declarations
      'eqeqeq': ['error', 'always', { null: 'ignore' }],  // Always use === except for null comparisons
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],  // Allow only specific console methods
      'no-debugger': 'error',  // Disallow debugger statements in production code
      'no-else-return': 'error',  // Disallow else after a return in an if block
      'no-empty-function': 'error',  // Disallow empty functions
      'no-eval': 'error',  // Disallow eval() due to security concerns
      'no-extend-native': 'error',  // Disallow extending native JavaScript objects
      'no-extra-bind': 'error',  // Disallow unnecessary .bind() calls
      'no-floating-decimal': 'error',  // Disallow .5 (require 0.5)
      'no-implicit-coercion': 'error',  // Disallow shorthand type conversions
      'no-implied-eval': 'error',  // Disallow setTimeout("string") and similar functions
      'no-invalid-this': 'error',  // Disallow this keywords outside of classes or class-like objects
      'no-labels': 'error',  // Disallow labeled statements
      'no-lone-blocks': 'error',  // Disallow unnecessary nested blocks
      'no-lonely-if': 'error',  // Disallow if as the only statement in an else block
      'no-loop-func': 'error',  // Disallow functions inside loops
      'no-magic-numbers': ['warn', {  // Warn about magic numbers but with exceptions
        ignore: [-1, 0, 1, 2, 100, 200, 201, 204, 400, 401, 403, 404, 500],  // Common numbers and HTTP status codes
        ignoreArrayIndexes: true  // Allow using numbers for array indexing
      }],
      'prefer-template': 'error',  // Use template literals instead of string concatenation
      'radix': 'error',  // Enforce the consistent use of the radix argument when using parseInt()
      'yoda': 'error',  // Disallow Yoda conditions (if (4 === count))

      // ===== IMPORT RULES =====
      'import/order': ['error', {
        groups: [  // Ordering of import statements
          'builtin',    // Node.js built-in modules (fs, path)
          'external',   // npm packages
          'internal',   // Internal modules
          'parent',     // Imports from parent directory
          'sibling',    // Imports from same directory
          'index'       // Imports from index files
        ],
        'newlines-between': 'always'  // Require newlines between import groups
      }],
      // ===== UNICORN RULES =====
      'unicorn/catch-error-name': 'error',  // Use consistent error names in catch blocks
      'unicorn/error-message': 'error',  // Enforce error messages
      'unicorn/filename-case': ['error', {  // Enforce consistent filename casing
        case: 'camelCase',
        ignore: ['README.md']  // Exceptions for common files
      }],
      'unicorn/prefer-module': 'error',  // Allow only ESM
      'unicorn/prefer-node-protocol': 'error',  // Use node: protocol for Node.js built-ins

      // ===== STYLISTIC RULES =====
      '@stylistic/js/template-tag-spacing': ['error', 'never'],  // No space between template tag and template literal
      '@stylistic/js/array-bracket-spacing': ['error', 'never'],  // No spaces inside array brackets
      '@stylistic/js/arrow-parens': ['error', 'always'],  // Always use parens for arrow function params
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],  // Spaces around arrow (=>)
      '@stylistic/js/block-spacing': ['error', 'always'],  // Space inside blocks
      '@stylistic/js/brace-style': ['error', '1tbs', { allowSingleLine: true }],  // One true brace style
      '@stylistic/js/comma-dangle': ['error', 'only-multiline'],  // Trailing commas only in multiline
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],  // Space after comma, not before
      '@stylistic/js/comma-style': ['error', 'last'],  // Commas at end of line
      '@stylistic/js/computed-property-spacing': ['error', 'never'],  // No spaces in computed properties
      '@stylistic/js/eol-last': ['error', 'always'],  // Always end files with newline
      '@stylistic/js/func-call-spacing': ['error', 'never'],  // No space between function name and parentheses
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],  // 2-space indentation, 1 space for case
      '@stylistic/js/key-spacing': ['error', { beforeColon: false, afterColon: true }],  // Space after colon in objects
      '@stylistic/js/keyword-spacing': ['error', { before: true, after: true }],  // Space around keywords
      '@stylistic/js/linebreak-style': ['error', 'unix'],  // LF line endings
      '@stylistic/js/max-len': ['error', {  // Maximum line length of 200 characters
        code: 200,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],  // Multiline for multiline ternaries
      '@stylistic/js/new-parens': 'error',  // Require parentheses with new operator
      '@stylistic/js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],  // Newline for longer chains
      '@stylistic/js/no-mixed-spaces-and-tabs': 'error',  // No mixing spaces and tabs
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],  // Limit consecutive empty lines
      '@stylistic/js/no-tabs': 'error',  // No tabs for indentation
      '@stylistic/js/no-trailing-spaces': 'error',  // No trailing whitespace
      '@stylistic/js/no-whitespace-before-property': 'error',  // No space before property
      '@stylistic/js/object-curly-newline': ['error', { consistent: true }],  // Consistent newlines in objects
      '@stylistic/js/object-curly-spacing': ['error', 'always'],  // Spaces inside object braces
      '@stylistic/js/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],  // Allow all properties on one line
      '@stylistic/js/operator-linebreak': ['error', 'before'],  // Line breaks before operators
      '@stylistic/js/padded-blocks': ['error', 'never'],  // No padding inside blocks
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],  // Single quotes with exceptions
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],  // No space in rest/spread
      '@stylistic/js/semi': ['error', 'always'],  // Always use semicolons
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],  // Space after semicolon, not before
      '@stylistic/js/semi-style': ['error', 'last'],  // Semicolon at end of statement
      '@stylistic/js/space-before-blocks': 'error',  // Space before blocks
      '@stylistic/js/space-before-function-paren': ['error', {  // Space before function parentheses rules
        anonymous: 'always',  // Space for anonymous functions
        named: 'never',       // No space for named functions
        asyncArrow: 'always'  // Space for async arrow functions
      }],
      '@stylistic/js/space-in-parens': ['error', 'never'],  // No spaces inside parentheses
      '@stylistic/js/space-infix-ops': 'error',  // Space around operators
      '@stylistic/js/space-unary-ops': ['error', { words: true, nonwords: false }],  // Space for word operators, not for others
      '@stylistic/js/spaced-comment': ['error', 'always', {  // Space after comment markers
        line: { markers: ['*package', '!', '/', ',', '='] },  // Exceptions for line comments
        block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }  // Exceptions for block comments
      }],
      '@stylistic/js/switch-colon-spacing': ['error', { after: true, before: false }],  // Space after colon in switch
      '@stylistic/js/template-curly-spacing': ['error', 'never'],  // No space inside template literals
    }
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',  // Use latest features
      sourceType: 'module',  // Treat files as ES modules
    }
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
  // Special configuration for test files
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**', '**/tests/**'],  // Test file patterns
    languageOptions: {
      globals: {
        ...globals.jest,   // Include Jest globals
        ...globals.mocha   // Include Mocha globals
      }
    },
    // Relaxed rules for test files
    rules: {
      'no-magic-numbers': 'off',  // Allow magic numbers in tests
      'max-lines': 'off',         // Allow longer files in tests
      'max-nested-callbacks': 'off',  // Allow more nested callbacks in tests
    }
  },
  // Files to be ignored by ESLint globally across all configurations
  globalIgnores([
    '.vscode/',       // VS Code configuration files
    '.prettierignore', // Prettier ignore files
    '.gitignore',     // Git ignore files
    'package-lock.json', // NPM lock file
    'node_modules/',  // Dependencies
    'dist/',          // Build output
    'build/',         // Alternative build output
    // '*.config.*'      // Configuration files (including this one)
  ]),
]);
