import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  {
    plugins: {
      "@stylistic": stylistic,
      import: importPlugin,
      unicorn
    },
    rules: {
      // Core rules
      "no-console": "warn",
      "no-debugger": "error",

      // Stylistic rules
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/jsx-quotes": ["error", "prefer-single"],

      // Import rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always"
        }
      ],

      // Unicorn rules
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
          ignore: ["README.md"]
        }
      ]
    }
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "*.config.*" // Ignore config files
    ]
  },
  globalIgnores([".vscode/","package-lock.json"])
]);
