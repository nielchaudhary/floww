module.exports = {
    env: {
      es6: true,
      node: true,
    },
    extends: ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "import", "jsdoc", "prefer-arrow"],
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
      curly: ["warn"],
      "no-console": ["warn"],
      "prefer-object-spread": ["error"],
      "func-style": ["warn", "expression", { allowArrowFunctions: true }],
      "array-callback-return": ["warn"],
    },
  };