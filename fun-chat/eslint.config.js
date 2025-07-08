import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintPluginUnicorn.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    noInlineConfig: true,
    reportUnusedDisableDirectives: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint", "unicorn"],
    extends: [
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:unicorn/recommended",
    ],
    rules: {
      "unicorn/no-null": "error",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-zero-fractions": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-magic-numbers": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
      "max-lines-per-function": [
        "error",
        {
          max: 40,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
