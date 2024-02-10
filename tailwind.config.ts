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
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-default':
                    'background: linear-gradient( from 100deg, rgb(248, 211, 0) 0%, rgb(248, 211, 0) 30%, #000000 40%, #000000 100%)',
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
}
export default config
