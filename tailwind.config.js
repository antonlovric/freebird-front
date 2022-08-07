module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#17191E',
                orange: '#f97316',
                grey: '#D9D9D9',
                red: '#DE1041',
            },
        },
    },
    plugins: [],
};
