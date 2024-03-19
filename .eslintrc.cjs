module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: { react: { version: '18.2' } },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs,json}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', '.eslintrc.json'],
  plugins: ['react'],
  rules: {
    camelcase: 'off',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': ['error', { destructuring: 'any' }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-object-spread': 'error',
    'prefer-destructuring': 'error',
    'prefer-numeric-literals': 'error',
    'react/no-unescaped-entities': 0,
  },
}
