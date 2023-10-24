import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode:'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        main:'#ffa006',
        header:'#333333',
        boldHeader:'#303030',
        lighterText:'#a8a8a8'
      },
      fontFamily:{
        header:'Almarai, sans-serif',
      },
      backgroundImage: {
        'waves':"url('/static/waves.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
