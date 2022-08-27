import { defineNuxtConfig } from 'nuxt';
import { createIconsConfig } from 'vuestic-ui';

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

    head: {
        title: 'Test',
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        config: {},
        injectPosition: 0,
        viewer: true,
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

    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    ssr: true,
    target: 'server',
});
