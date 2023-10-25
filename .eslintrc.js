module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:github/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "i18n-text/no-en": "off",
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: [".eslintrc.js"],
};
