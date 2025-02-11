module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    'no-console': ["warn" , { allow: [ "log", "error", "warn" ] }],
    'no-underscore-dangle': [ 'error', {allow: ['_id'] }],
    'consistent-return': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.js", "**/*.spec.js"]}],
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "max-classes-per-file": "off",
  },
};