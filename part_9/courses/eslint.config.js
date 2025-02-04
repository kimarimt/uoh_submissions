import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'comma-dangle': ['error', 'never'],
      'eqeqeq': 'error',
      'indent': ['error', 2],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/curly-newline': ["error", "always"],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/jsx-max-props-per-line': [1, { 'when': 'always' }],
      '@stylistic/jsx-sort-props': [1, { multiline: 'first' }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/member-delimiter-style': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single']
    },
  },
)
