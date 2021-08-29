module.exports = {
  parser: "vue-eslint-parser",
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "require-jsdoc": "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-expressions": "warn",
    "no-unused-vars": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  plugins: ["@typescript-eslint"],
}
