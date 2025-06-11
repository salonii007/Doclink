module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#006666"
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}
