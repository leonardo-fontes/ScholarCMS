/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                manrope: ["Manrope", "sans-serif"],
            },
            colors: {
                primary: "#5030E5",
                primaryLight: "#DDD7FA",
                black: "#222222",
                gray: "#858585",
                lightGray: "#F3F4F6",
                customGray: "#F3F5F6"
            },
        },
    },
    plugins: [],
};
