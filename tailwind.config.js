module.exports = {
    purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'chic-violet': '#7e00bf',
                'neon-red': '#e11900',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}