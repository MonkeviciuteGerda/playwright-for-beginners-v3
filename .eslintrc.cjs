module.exports = {
  parserOptions: {
    ecmaVersion: 'ESNext',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  extends: [
    '@nordpass/eslint-config/library',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    'prefer-destructuring': 'off',
    'no-unused-expressions': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'linebreak-style': 0,
        'max-len': ['error', {
          code: 160,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
        }],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variableLike',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
  ],
};