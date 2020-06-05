module.exports = {
  ignorePatterns: [
    '!.eslintrc.js',
    '/dist',
  ],
  overrides: [
    {
      files: ['*.js'],
      extends: 'airbnb/base',
    },
    {
      files: ['gulpfile.esm.js'],
      rules: {
        'no-console': 'off',
        'global-require': 'off',
      },
    },
    {
      files: ['*.ts'],
      extends: 'airbnb-typescript/base',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
