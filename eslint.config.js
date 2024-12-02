import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import playwright from 'eslint-plugin-playwright';



export default [
  {
    files: ["**/*.js", "**/*.mjs"],
  },
  { ignores: ['.jest-html-reporters-attach/*'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  playwright.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic/js': stylisticJs
    }
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "off",
      "no-prototype-builtins": 0,
      "@stylistic/js/indent": [
        "error",
        2,
        { "SwitchCase": 1 }
      ],
      "space-in-parens": ["error", "never"],
      "jest/no-standalone-expect": "off",
      "@stylistic/js/object-curly-spacing": ["error","always"],
      "cypress/no-unnecessary-waiting": "off"
    }
  },
  {
    files: ["**/*.mjs"],
    rules: {
      "indent": "off"
    }
  },
  {
    ignores: ["data/**", "mochawesome-report/**"]
  }
];