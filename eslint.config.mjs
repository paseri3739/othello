import globals from "globals";
import pluginJs from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: "module",
      globals: {
        $: "readonly",
        JQuery: "readonly",
        _: "readonly",
      },
    },

    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-var": "error",
      "jsdoc/check-alignment": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/check-types": "error",
      "jsdoc/implements-on-classes": "error",
      "jsdoc/no-undefined-types": "error",
      "jsdoc/require-description": "error",
      "jsdoc/require-hyphen-before-param-description": "error",
      "jsdoc/require-param": "error",
      "jsdoc/require-param-name": "error",
      "jsdoc/require-param-type": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-check": "error",
      "jsdoc/require-returns-type": "error",
    },

    ignores: ["dist/*"],
    files: ["**/*.js"],
    plugins: {
      jsdoc,
      globals,
      pluginJs,
    },
  },
];
