/**
 * @typedef {object} Config
 * @property {Array<string>=} extends
 */

/**
 * @param {Config=} config
 * @returns {import("eslint").Linter.Config}
 */
function baseConfig(config = {}) {
  config.extends ??= []

  return {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jsdoc/recommended-typescript-flavor',
    ].concat(config.extends),
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['apps/**/tsconfig.json', 'packages/**/tsconfig.json'],
      sourceType: 'module',
      ecmaVersion: 'latest',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint', 'jsdoc'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
      indent: ['warn', 4, { SwitchCase: 1 }],
      '@typescript-eslint/indent': ['warn', 4, { SwitchCase: 1 }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { fixStyle: 'inline-type-imports' },
      ],
      'comma-dangle': ['warn', 'always-multiline'],
      '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/method-signature-style': ['warn', 'method'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
    ignorePatterns: [
      'node_modules',
      'dist',
      'build',
      'static',
      'public',
      '.git',
      '.gitignore',
      '*.md',
      '*.js',
      '*.lockb',
      'tsconfig.tsbuildinfo',
    ],
  }
}

module.exports = baseConfig()
