import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-restricted-syntax': [
        'warn',
        {
          selector: "JSXAttribute[value.expression.type='ArrowFunctionExpression']",
          message: 'Avoid anonymous arrow functions in JSX props. Extract to named function.',
        },
        {
          selector: "VariableDeclarator[init.type='ArrowFunctionExpression']",
          message: 'Use named functions instead of anonymous arrow functions.',
        },
      ],
    },
  },
])
