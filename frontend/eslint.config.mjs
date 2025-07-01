// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: [
      "**/.nuxt/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.output/**",
    ],
    rules: {
      // Vue specific rules (similar to plugin:vue/recommended)
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "never",
            normal: "always",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: { max: 3 },
          multiline: { max: 1 },
        },
      ],
      "vue/html-indent": ["error", 2],
      "vue/html-closing-bracket-newline": [
        "error",
        {
          singleline: "never",
          multiline: "always",
        },
      ],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/no-multiple-template-root": "off", // Vue 3 allows multiple root elements
      
      // General ESLint rules (similar to eslint:recommended)
      "no-console": "warn",
      "no-debugger": "warn",
      "no-unused-vars": "warn",
      "no-undef": "error",
      "prefer-const": "error",
      "no-var": "error",
      
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
)
