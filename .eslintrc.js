module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      // XXX Ideally we'd use `detect` to automatically detect the React
      // version to use, but this can only work when `eslint-plugin-react` and
      // `react` packages are installed in the same workspace. Obviously
      // `react` is installed in pkg/app, but in order to avoid needing a full
      // `yarn install` to invoke `eslint` we have `eslint-plugin-react`
      // installed in the "root" workspace only, such that `yarn workpaces
      // focus @monax/aspen` is sufficient to provide an environment in which
      // to invoke `eslint`. This is an important CI optimisation, but means
      // that autodetection is not possible, so we must manually keep this
      // version aligned with what is installed in pkg/app.
      version: '18.2.0',
    },
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/dist/**/*.ts'],
};
