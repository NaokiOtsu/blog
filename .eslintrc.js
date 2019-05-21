module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier/vue'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  globals: {
    $nuxt: true
  },
}
