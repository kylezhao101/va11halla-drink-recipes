/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'red-adelhyde':'#F21637',
        'yellow-bronson':'#FFD230',
        'blue-powdered':'#5E95FF',
        'green-flanergide':'#A6D26D',
        'cyan-karmotrine':'#34FCFC'
      },
      fontFamily: {
        body : ['Space Mono']
      },
      width: {
        card: '268px'
      }
    },
  },
  plugins: [],
}

