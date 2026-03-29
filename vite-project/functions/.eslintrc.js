module.exports = {
  env: {
    es6: true,
    node: true,  // already present, keeps Node.js globals
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended"  // removed "google" for now to avoid unnecessary strict rules
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  globals: {
    require: "readonly",
    module: "readonly",
    exports: "readonly",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};