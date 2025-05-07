// eslint.config.js
// This file uses the new flat config format introduced in ESLint v9
// It uses JavaScript modules (ESM) instead of CommonJS

// Core ESLint functionality
import js from "@eslint/js";  // Provides core ESLint rules for JavaScript
import { defineConfig, globalIgnores } from "eslint/config";  // Helper functions for flat config

// Global variables definitions for different environments
import globals from "globals";  // Provides predefined global variables for different environments

// Additional plugins for enhanced linting capabilities
import unicornPlugin from "eslint-plugin-unicorn";  // Provides additional rules for better code quality
import importPlugin from "eslint-plugin-import";  // Rules for ES6+ import/export syntax
import stylisticJs from "@stylistic/eslint-plugin-js";  // Style/formatting rules (alternative to Prettier)

export default defineConfig([
  // Files to be ignored by ESLint globally across all configurations
  globalIgnores([
    ".vscode/",       // VS Code configuration files
    ".prettierignore", // Prettier ignore files
    ".gitignore",     // Git ignore files
    "package-lock.json", // NPM lock file
    "node_modules/",  // Dependencies
    "dist/",          // Build output
    "build/",         // Alternative build output
    "*.config.*"      // Configuration files (including this one)
  ]),

  // Base configuration for all JavaScript files
  {
    files: ["**/*.js"],  // Apply to all JavaScript files
    languageOptions: {
      ecmaVersion: 'latest',  // Use latest features
      sourceType: "module",  // Treat files as ES modules
      globals: {
        ...globals.node,   // Include Node.js global variables
      }
    },
    // Register plugins
    plugins: {
      js,  // Core ESLint JavaScript rules
      import: importPlugin,  // Import/export syntax rules
      unicorn: unicornPlugin,  // Additional code quality rules
      '@stylistic/js': stylisticJs  // Code formatting rules
    },
    // Configuration for plugins that need additional setup
    settings: {
      // Configure import plugin to resolve modules correctly
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs", ".json"]  // Supported file extensions
        }
      },
      // Node.js specific settings
      "node": {
        tryExtensions: [".js", ".mjs", ".cjs", ".json"],  // Extensions to try when resolving imports
        version: ">=22.0.0"  // Minimum Node.js version for the project
      }
    },
    // Use recommended rule sets
    extends: [
      "js/recommended",  // Core ESLint recommended rules
    ],
    rules: {
      // ===== POSSIBLE PROBLEMS =====
      // Rules that detect patterns that might cause bugs or unexpected behavior

      "array-callback-return": "error",  // Enforces return statements in array methods like map() and filter()
      "no-await-in-loop": "warn",  // Warns about awaiting promises in loops (can be inefficient but sometimes necessary)
      "no-constant-binary-expression": "error",  // Disallows expressions that are always true/false
      "no-constructor-return": "error",  // Prevents returning values from constructors
      "no-duplicate-imports": "error",  // Prevents importing from the same module multiple times
      "no-promise-executor-return": "error",  // Prevents returning values from Promise constructors
      "no-self-compare": "error",  // Prevents comparing a variable with itself
      "no-template-curly-in-string": "warn",  // Warns about template literal placeholders in regular strings
      "no-unmodified-loop-condition": "error",  // Prevents infinite loops due to unmodified conditions
      "no-unreachable-loop": "error",  // Prevents loops that will never iterate
      "no-unused-private-class-members": "error",  // Prevents unused private fields
      "no-unused-vars": ["warn", {  // Warns about unused variables but with exceptions
        argsIgnorePattern: "^_",  // Ignore parameters starting with underscore
        varsIgnorePattern: "^_",  // Ignore variables starting with underscore
        caughtErrorsIgnorePattern: "^_"  // Ignore caught errors starting with underscore
      }],
      "no-use-before-define": ["error", {  // Prevents using variables before they are defined
        functions: false,  // Allow function hoisting
        classes: true,     // Don't allow classes to be used before definition
        variables: true    // Don't allow variables to be used before definition
      }],
      "require-atomic-updates": "error",  // Prevents race conditions with async functions

      // ===== SUGGESTIONS =====
      // Rules that enforce stylistic preferences and best practices

      "arrow-body-style": ["error", "as-needed"],  // Use concise arrow function body when possible
      "block-scoped-var": "error",  // Enforce variable scope to respect block scope
      "camelcase": ["error", { properties: "never" }],  // Use camelCase but don't enforce on properties
      "complexity": ["warn", 15],  // Warn when code becomes too complex (cyclomatic complexity)
      // "consistent-return": "error",  // Functions must consistently return values or undefined
      "consistent-return": "off",  // Functions can return values or undefined
      "curly": ["error", "multi-line"],  // Require braces for multi-line blocks
      "default-case": "error",  // Require default case in switch statements
      "default-case-last": "error",  // Default case should be the last case in switch
      "default-param-last": "error",  // Default parameters should be last in function declarations
      "dot-notation": "error",  // Use obj.prop instead of obj['prop'] when possible
      "eqeqeq": ["error", "always", { null: "ignore" }],  // Always use === except for null comparisons
      "func-style": ["error", "expression"],  // Prefer const func = () => {} over function func() {}
      "max-depth": ["warn", 4],  // Warn when nesting exceeds 4 levels
      "max-lines": ["warn", 500],  // Warn when files exceed 500 lines
      "max-nested-callbacks": ["warn", 4],  // Limit nested callbacks (important for async code)
      "max-params": ["warn", 5],  // Warn when functions have more than 5 parameters
      "no-alert": "error",  // Disallow browser alerts (not applicable in Node but good practice)
      "no-console": ["warn", { allow: ["error", "warn", "info"] }],  // Allow only specific console methods
      "no-debugger": "error",  // Disallow debugger statements in production code
      "no-else-return": "error",  // Disallow else after a return in an if block
      "no-empty-function": "error",  // Disallow empty functions
      "no-eval": "error",  // Disallow eval() due to security concerns
      "no-extend-native": "error",  // Disallow extending native JavaScript objects
      "no-extra-bind": "error",  // Disallow unnecessary .bind() calls
      "no-floating-decimal": "error",  // Disallow .5 (require 0.5)
      "no-implicit-coercion": "error",  // Disallow shorthand type conversions
      "no-implied-eval": "error",  // Disallow setTimeout("string") and similar functions
      "no-invalid-this": "error",  // Disallow this keywords outside of classes or class-like objects
      "no-labels": "error",  // Disallow labeled statements
      "no-lone-blocks": "error",  // Disallow unnecessary nested blocks
      "no-lonely-if": "error",  // Disallow if as the only statement in an else block
      "no-loop-func": "error",  // Disallow functions inside loops
      "no-magic-numbers": ["warn", {  // Warn about magic numbers but with exceptions
        ignore: [-1, 0, 1, 2, 100, 200, 201, 204, 400, 401, 403, 404, 500],  // Common numbers and HTTP status codes
        ignoreArrayIndexes: true  // Allow using numbers for array indexing
      }],
      "no-multi-spaces": "error",  // Disallow multiple spaces
      "no-multi-str": "error",  // Disallow multiline strings with backslashes
      "no-nested-ternary": "error",  // Disallow nested ternary expressions
      "no-new": "error",  // Disallow new operators outside of assignments
      "no-new-func": "error",  // Disallow new Function() (similar to eval)
      "no-new-wrappers": "error",  // Disallow new String(), Number(), Boolean()
      "no-param-reassign": ["error", { props: false }],  // Allow modifying properties but not the parameter itself
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],  // Allow ++ only in for loops
      "no-proto": "error",  // Disallow __proto__ property
      "no-return-assign": ["error", "except-parens"],  // Allow return assignment only within parentheses
      "no-return-await": "error",  // Disallow unnecessary return await
      "no-script-url": "error",  // Disallow javascript: URLs
      "no-sequences": "error",  // Disallow comma operator
      "no-shadow": "error",  // Disallow variable declarations from shadowing variables in outer scope
      "no-throw-literal": "error",  // Require throwing Error objects
      "no-undef-init": "error",  // Disallow initializing variables to undefined
      "no-unneeded-ternary": "error",  // Disallow ternary operators when simpler alternatives exist
      "no-unused-expressions": "error",  // Disallow unused expressions
      "no-useless-call": "error",  // Disallow unnecessary .call() and .apply()
      "no-useless-computed-key": "error",  // Disallow unnecessary computed property keys
      "no-useless-concat": "error",  // Disallow unnecessary concatenation
      "no-useless-constructor": "error",  // Disallow unnecessary constructors
      "no-useless-rename": "error",  // Disallow renaming imports, exports, and destructured assignments to the same name
      "no-useless-return": "error",  // Disallow redundant return statements
      "no-var": "error",  // Use let or const instead of var
      "no-void": "error",  // Disallow void operators
      "object-shorthand": "error",  // Require object literal shorthand syntax
      "prefer-arrow-callback": "error",  // Require arrow functions as callbacks
      "prefer-const": "error",  // Require const for variables that are never reassigned
      "prefer-destructuring": ["error", {  // Encourage use of destructuring
        array: false,  // Don't enforce for arrays
        object: true   // Enforce for objects
      }],
      "prefer-promise-reject-errors": "error",  // Require using Error objects as Promise rejection reasons
      "prefer-rest-params": "error",  // Use rest parameters instead of arguments
      "prefer-spread": "error",  // Use spread syntax instead of .apply()
      "prefer-template": "error",  // Use template literals instead of string concatenation
      "radix": "error",  // Enforce the consistent use of the radix argument when using parseInt()
      "require-await": "error",  // Disallow async functions with no await expressions
      "yoda": "error",  // Disallow Yoda conditions (if (4 === count))

      // ===== IMPORT RULES =====
      // Rules for ES6 import/export syntax

      "import/order": ["error", {
        groups: [  // Ordering of import statements
          "builtin",    // Node.js built-in modules (fs, path)
          "external",   // npm packages
          "internal",   // Internal modules
          "parent",     // Imports from parent directory
          "sibling",    // Imports from same directory
          "index"       // Imports from index files
        ],
        "newlines-between": "always"  // Require newlines between import groups
      }
      ],

      // ===== STYLISTIC RULES =====
      // Code formatting rules (alternative to using Prettier)

      "@stylistic/js/array-bracket-spacing": ["error", "never"],  // No spaces inside array brackets
      "@stylistic/js/arrow-parens": ["error", "always"],  // Always use parens for arrow function params
      "@stylistic/js/arrow-spacing": ["error", { before: true, after: true }],  // Spaces around arrow (=>)
      "@stylistic/js/block-spacing": ["error", "always"],  // Space inside blocks
      "@stylistic/js/brace-style": ["error", "1tbs", { allowSingleLine: true }],  // One true brace style
      "@stylistic/js/comma-dangle": ["error", "only-multiline"],  // Trailing commas only in multiline
      "@stylistic/js/comma-spacing": ["error", { before: false, after: true }],  // Space after comma, not before
      "@stylistic/js/comma-style": ["error", "last"],  // Commas at end of line
      "@stylistic/js/computed-property-spacing": ["error", "never"],  // No spaces in computed properties
      "@stylistic/js/eol-last": ["error", "always"],  // Always end files with newline
      "@stylistic/js/func-call-spacing": ["error", "never"],  // No space between function name and parentheses
      "@stylistic/js/indent": ["error", 2, { SwitchCase: 1 }],  // 2-space indentation, 1 space for case
      "@stylistic/js/key-spacing": ["error", { beforeColon: false, afterColon: true }],  // Space after colon in objects
      "@stylistic/js/keyword-spacing": ["error", { before: true, after: true }],  // Space around keywords
      "@stylistic/js/linebreak-style": ["error", "unix"],  // LF line endings
      "@stylistic/js/max-len": ["error", {  // Maximum line length of 100 characters
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }],
      "@stylistic/js/multiline-ternary": ["error", "always-multiline"],  // Multiline for multiline ternaries
      "@stylistic/js/new-parens": "error",  // Require parentheses with new operator
      "@stylistic/js/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],  // Newline for longer chains
      "@stylistic/js/no-mixed-spaces-and-tabs": "error",  // No mixing spaces and tabs
      "@stylistic/js/no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],  // Limit consecutive empty lines
      "@stylistic/js/no-tabs": "error",  // No tabs for indentation
      "@stylistic/js/no-trailing-spaces": "error",  // No trailing whitespace
      "@stylistic/js/no-whitespace-before-property": "error",  // No space before property
      "@stylistic/js/object-curly-newline": ["error", { consistent: true }],  // Consistent newlines in objects
      "@stylistic/js/object-curly-spacing": ["error", "always"],  // Spaces inside object braces
      "@stylistic/js/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],  // Allow all properties on one line
      "@stylistic/js/operator-linebreak": ["error", "before"],  // Line breaks before operators
      "@stylistic/js/padded-blocks": ["error", "never"],  // No padding inside blocks
      "@stylistic/js/quotes": ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],  // Single quotes with exceptions
      "@stylistic/js/rest-spread-spacing": ["error", "never"],  // No space in rest/spread
      "@stylistic/js/semi": ["error", "always"],  // Always use semicolons
      "@stylistic/js/semi-spacing": ["error", { before: false, after: true }],  // Space after semicolon, not before
      "@stylistic/js/semi-style": ["error", "last"],  // Semicolon at end of statement
      "@stylistic/js/space-before-blocks": "error",  // Space before blocks
      "@stylistic/js/space-before-function-paren": ["error", {  // Space before function parentheses rules
        anonymous: "always",  // Space for anonymous functions
        named: "never",       // No space for named functions
        asyncArrow: "always"  // Space for async arrow functions
      }],
      "@stylistic/js/space-in-parens": ["error", "never"],  // No spaces inside parentheses
      "@stylistic/js/space-infix-ops": "error",  // Space around operators
      "@stylistic/js/space-unary-ops": ["error", { words: true, nonwords: false }],  // Space for word operators, not for others
      "@stylistic/js/spaced-comment": ["error", "always", {  // Space after comment markers
        line: { markers: ["*package", "!", "/", ",", "="] },  // Exceptions for line comments
        block: { balanced: true, markers: ["*package", "!", ",", ":", "::", "flow-include"], exceptions: ["*"] }  // Exceptions for block comments
      }],
      "@stylistic/js/switch-colon-spacing": ["error", { after: true, before: false }],  // Space after colon in switch
      "@stylistic/js/template-curly-spacing": ["error", "never"],  // No space inside template literals
      "@stylistic/js/template-tag-spacing": ["error", "never"],  // No space between template tag and template literal

      // ===== UNICORN RULES =====
      // Additional best practices from the unicorn plugin, customized for Node.js

      "unicorn/better-regex": "error",  // Use more efficient and clearer regular expressions
      "unicorn/catch-error-name": "error",  // Use consistent error names in catch blocks
      "unicorn/error-message": "error",  // Enforce error messages
      "unicorn/filename-case": ["error", {  // Enforce consistent filename casing
        case: "camelCase",
        ignore: ["README.md"]  // Exceptions for common files
      }],
      "unicorn/no-array-for-each": "off",  // Allow forEach (common in Node.js)
      "unicorn/no-array-reduce": "off",  // Allow reduce (useful for data processing)
      "unicorn/no-null": "off",  // Allow null (common in Node.js APIs)
      "unicorn/prefer-module": "off",  // Allow both CommonJS and ESM
      "unicorn/prefer-node-protocol": "error",  // Use node: protocol for Node.js built-ins
    }
  },

  // Special configuration for test files
  {
    files: ["**/*.test.js", "**/*.spec.js", "**/__tests__/**", "**/tests/**"],  // Test file patterns
    languageOptions: {
      globals: {
        ...globals.jest,   // Include Jest globals
        ...globals.mocha   // Include Mocha globals
      }
    },
    // Relaxed rules for test files
    rules: {
      "no-magic-numbers": "off",  // Allow magic numbers in tests
      "max-lines": "off",         // Allow longer files in tests
      "max-nested-callbacks": "off",  // Allow more nested callbacks in tests
    }
  }
]);