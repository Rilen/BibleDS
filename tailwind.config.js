/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{md,html,js,ts}",
        "./observablehq.config.js",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#38bdf8",
                    dark: "#0f172a",
                },
            },
            animation: {
                'reveal': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.4s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
