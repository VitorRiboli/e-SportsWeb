/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      'sans': ['inter', 'sans-serif']
    },
    color: {
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/fundo.svg')",
        'nlw-gradient': 'linear-gradient(90deg, #9572fc 10%, #43e7ad 70%, #e1d55d 20%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);',
      
      }
    },
  },
  plugins: [],
}
