import { defineNuxtConfig } from 'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vuestic/nuxt',
    // '@pinia/nuxt',
    // '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  $meta: { name: 'FreeBirdMusic' },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vuestic: {
    config: {
      colors: {
        primary: '#f97316',
      },
      components: {
        VaInput: {
          color: '#000',
        },
        VaSelect: {
          color: '#000',
        },
        VaButton: {
          textColor: '#fff',
        },
      },
    },
    css: ['grid', 'reset', 'typography'],
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || '',
    },
  },

  ssr: false,
  target: 'server',
});
