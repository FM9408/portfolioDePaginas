import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "vite.config.js", "build/**", "public/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "unused-imports": unusedImports, // 2. Registra el plugin aquí
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "no-console": ["warn", { allow: ["warn", "error"] }], 
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error", // En cuanto guardes o uses --fix, las BORRARÁ
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "max-len": ["error", { code: 120, ignoreUrls: true }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "warn",
      "react/self-closing-comp": "error",
    },
    settings: {
      react: {
        version: "18.3", // 👈 IMPORTANTE: Define la versión fija (cambia a "19.0" si usas React 19)
      },
    },
  },
  eslintConfigPrettier,
];
