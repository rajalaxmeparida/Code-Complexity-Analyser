/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0d1117',
                surface: '#161b22',
                surfaceHighlight: '#21262d',
                primary: '#2f81f7', // Github-like blue
                secondary: '#3fb950',
                accent: '#a371f7',
                danger: '#da3633',
                warning: '#d29922',
                textMain: '#c9d1d9',
                textMuted: '#8b949e',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            }
        },
    },
    plugins: [],
}
