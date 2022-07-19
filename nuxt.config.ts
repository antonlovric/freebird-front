import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    css: ['~/assets/css/tailwind.css'],
    modules: ['@vuestic/nuxt'],

    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        config: {},
        injectPosition: 0,
        viewer: true,
    },

    googleFonts: {
        families: {
            Roboto: true,
            Raleway: {
                wght: [100, 400, 600],
                ital: [100],
            },
            'Russo+One': true,
        },
    },

    vuestic: {
        config: {
            // Config here
        },
    },
    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
});
