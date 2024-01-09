module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-useless-return': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
    'no-continue': 'off',
  },
};
