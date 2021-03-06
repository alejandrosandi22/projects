module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/named': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'default-param-last': 'off',
    'react/react-in-jsx-scope': 'off',
    'func-names': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
