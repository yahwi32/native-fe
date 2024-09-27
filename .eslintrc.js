module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      tsconfigRootDir: __dirname,
    },
    plugins: ["react", "@typescript-eslint", "import"],
    rules: {
      semi: ["error", "always"],
      "react/react-in-jsx-scope": "off",
      "comma-spacing": ["error", { before: false, after: true }],
      "array-bracket-spacing": ["error", "never"],
      "no-trailing-spaces": ["error"],
      "react/prop-types": "off",
      "react/jsx-curly-spacing": ["warn", { when: "never", attributes: { allowMultiline: true }, children: true }],
      "react/jsx-equals-spacing": ["warn", "never"],
      "react/jsx-tag-spacing": "warn",
      "react/jsx-wrap-multilines": [
        "warn",
        {
          declaration: "parens",
          assignment: "parens",
          return: "parens-new-line",
          arrow: "parens",
          condition: "ignore",
          logical: "ignore",
          prop: "ignore",
        },
      ],
      // Ignore LF/CRLF line endings
      // 'end-of-line': 'off',
      // disable error related to require(path) react-native
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          // (unusedArg1, unusedArg2, arg3) while arg3 is only used is allowed
          args: "after-used",
          // (arg1, arg2, _arg3) while _arg3 is unused is allowed
          argsIgnorePattern: "^_",
          // ({..._props}) while _props is unused is allowed
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "react/display-name": ["off"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration[const=true]",
          message: "Do not declare const enums",
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
    ignorePatterns: [".eslintrc.js"],
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        parserOptions: {
          project: ["./tsconfig.json"],
        },
      },
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
  };
  