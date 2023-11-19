module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'src/api',
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 'off',
    'import/no-named-default': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-throw-literal': 'off',
    'max-len': [
      'warn',
      {
        'code': 120,
        'comments': 120,
      }
    ],
    'no-console': [
      'warn',
      {
        'allow': [
          'error',
          'info',
        ]
      }
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'object-curly-newline': ['error', { 'consistent': true }],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        ignoredNodes: ['TSTypeParameterInstantiation'],
        SwitchCase: 1,
      }],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': [ 'const', 'let', 'var' ], 'next': '*' },
      { 'blankLine': 'any',    'prev': [ 'const', 'let', 'var' ], 'next': [ 'const', 'let', 'var' ] },
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
      { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
      { 'blankLine': 'any',    'prev': 'directive', 'next': 'directive' },
    ],
    'import/extensions': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-array-index-key': 0,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/state-in-constructor': 'off',
    'react/require-default-props': 'off',
  }
}
