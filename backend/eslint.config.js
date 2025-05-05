const typescriptParser = require("@typescript-eslint/parser");

module.exports = {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        es6: true,
        node: true
      },
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
   
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "import": require("eslint-plugin-import"),
      "jsdoc": require("eslint-plugin-jsdoc"),
      "prefer-arrow": require("eslint-plugin-prefer-arrow")
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true, allowBoolean: true, allowAny: true, allowNullish: true, allowRegExp: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "Ignore$" },
      ],
      "no-warning-comments": [
        "warn",
        {
          terms: ["todo"],
          location: "start",
        },
      ],
      "@typescript-eslint/no-unsafe-argument": "off",
      "curly": ["warn"],
      "no-console": ["warn"],
      "prefer-object-spread": ["error"],
      "func-style": ["warn", "expression", { allowArrowFunctions: true }],
      "array-callback-return": ["warn"],
    },
  };