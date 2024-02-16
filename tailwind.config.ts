import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#FFFFFF',
                primary: '#F9F871',
                secondary: '#414042',
                accent: '#AFAFAF',
                primary_dark: '#F9E800',
                background_dark: '#121212',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                default:
                    'linear-gradient(120deg, #fff 0%, #fff 50%, #afafaf 50%, #afafaf 100%)',
                dark: 'linear-gradient(120deg, #121212 0%, #121212 50%, #414042 50%, #414042 100%)',
                article: 'url("/assets/articles.svg")',
            },
            backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },
        },
    },
    plugins: [require('daisyui')],
    darkMode: 'class',
}
export default config
