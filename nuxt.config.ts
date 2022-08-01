import { defineNuxtConfig } from 'nuxt';
import { createIconsConfig } from 'vuestic-ui';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
const fonts = [
    {
        name: 'mdi-{icon}',
        resolve: ({ icon }) => ({
            class: 'material-icons-outlined',
            content: icon,
            attrs: '',
            tag: 'span',
        }),
    },
];
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
});
