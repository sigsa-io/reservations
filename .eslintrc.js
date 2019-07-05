module.exports = {
  env: {
    'es6': true
  },
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
}