const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'time', 'timeEnd'] }],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    camelcase: [
      'warn',
      {
        properties: 'always',
        ignoreDestructuring: true,
        ignoreGlobals: false,
        ignoreImports: false,
      },
    ],
    'getter-return': ['error', { allowImplicit: true }],
    'no-dupe-keys': 'error',
    'no-duplicate-imports': 'error',
    'no-dupe-else-if': 'error',
    'no-duplicate-case': 'error',
    'no-else-return': ['error', { allowElseIf: true }],
    'no-implied-eval': 'error',
    'no-inner-declarations': 'warn',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        caughtErrors: 'all',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
