import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{vue,js,ts,jsx,tsx}',
    ],
    safelist: [
        "demo1",
        "hidden",
        "ki-filled",
        "ki-outline",
        "ki-duotone",
        "ki-solid",
        { pattern: /^apexcharts-.*$/ },
        { pattern: /^leaflet-.*$/ },
    ],
    theme: {
        extend: {
            base:{
                colors:{
                    'dark-blue': {
                        "50": "#eef2ff",
                        "100": "#e0e7ff",
                        "200": "#c7d2fe",
                        "300": "#a5b4fc",
                        "400": "#818cf8",
                        "500": "#6366f1",
                        "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
    "950": "#1e1b4b"
                      }
                }
            },
            fontFamily: {
                sans: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
                // gray: {
                //     100: "var(--tw-gray-100)",
                //     200: "var(--tw-gray-200)",
                //     300: "var(--tw-gray-300)",
                //     400: "var(--tw-gray-400)",
                //     500: "var(--tw-gray-500)",
                //     600: "var(--tw-gray-600)",
                //     700: "var(--tw-gray-700)",
                //     800: "var(--tw-gray-800)",
                //     900: "var(--tw-gray-900)",
                // },
                // primary: {
                //     DEFAULT: "var(--tw-primary)",
                //     active: "var(--tw-primary-active)",
                //     light: "var(--tw-primary-light)",
                //     clarity: "var(--tw-primary-clarity)",
                //     inverse: "var(--tw-primary-inverse)",
                //     foreground: "hsl(var(--primary-foreground))",
                // },
                // success: {
                //     DEFAULT: "var(--tw-success)",
                //     active: "var(--tw-success-active)",
                //     light: "var(--tw-success-light)",
                //     clarity: "var(--tw-success-clarity)",
                //     inverse: "var(--tw-success-inverse)",
                // },
                // warning: {
                //     DEFAULT: "var(--tw-warning)",
                //     active: "var(--tw-warning-active)",
                //     light: "var(--tw-warning-light)",
                //     clarity: "var(--tw-warning-clarity)",
                //     inverse: "var(--tw-warning-inverse)",
                // },
                // danger: {
                //     DEFAULT: "var(--tw-danger)",
                //     active: "var(--tw-danger-active)",
                //     light: "var(--tw-danger-light)",
                //     clarity: "var(--tw-danger-clarity)",
                //     inverse: "var(--tw-danger-inverse)",
                // },
                // info: {
                //     DEFAULT: "var(--tw-info)",
                //     active: "var(--tw-info-active)",
                //     light: "var(--tw-info-light)",
                //     clarity: "var(--tw-info-clarity)",
                //     inverse: "var(--tw-info-inverse)",
                // },
                // dark: {
                //     DEFAULT: "var(--tw-dark)",
                //     active: "var(--tw-dark-active)",
                //     light: "var(--tw-dark-light)",
                //     clarity: "var(--tw-dark-clarity)",
                //     inverse: "var(--tw-dark-inverse)",
                // },
                // secondary: {
                //     DEFAULT: "var(--tw-secondary)",
                //     active: "var(--tw-secondary-active)",
                //     light: "var(--tw-secondary-light)",
                //     clarity: "var(--tw-secondary-clarity)",
                //     inverse: "var(--tw-secondary-inverse)",
                //     foreground: "hsl(var(--secondary-foreground))",
                // },
                // light: {
                //     DEFAULT: "var(--tw-light)",
                //     active: "var(--tw-light-active)",
                //     light: "var(--tw-light-light)",
                //     clarity: "var(--tw-light-clarity)",
                //     inverse: "var(--tw-light-inverse)",
                // },
                // brand: {
                //     DEFAULT: "var(--tw-brand)",
                //     active: "var(--tw-brand-active)",
                //     light: "var(--tw-brand-light)",
                //     clarity: "var(--tw-brand-clarity)",
                //     inverse: "var(--tw-brand-inverse)",
                // },
                // coal: {
                //     100: "#15171C",
                //     200: "#13141A",
                //     300: "#111217",
                //     400: "#0F1014",
                //     500: "#0D0E12",
                //     600: "#0B0C10",
                //     black: "#000000",
                //     clarity: "rgba(24, 25, 31, 0.50)",
                // },
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require("./resources/metronic/core/plugins/plugin"),
        // require("./resources/js/plugins/components/theme"),
        // require("./resources/js/plugins/components/select"),
        require("./resources/metronic/core/plugins/components/pagination"),
        require("./resources/metronic/core/plugins/components/btn"),
    ],
};
