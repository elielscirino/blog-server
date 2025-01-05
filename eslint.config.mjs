import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
]