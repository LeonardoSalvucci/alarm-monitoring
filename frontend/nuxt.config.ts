import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt',],
  css: [
    '~/assets/css/main.css',
  ],
  nitro: {
    routeRules: {
      '/api/**': { proxy: { to: 'http://localhost:3001/api/**' }  },
    }
  },
  vite: {
    plugins: [
      // ignore type errors in the tailwindcss plugin
      // @ts-expect-error type errors in tailwindcss plugin
      tailwindcss(),
    ],
  }
})