module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "red",
        "secondary": "blue",
        "background": "#0c0c0c",
      },
      transitionDuration: {
        '4000': '4000ms',
      },
      keyframes: {
        'waiting': {
          '0%, 100%': { transform: 'scale(1.0)' },
          '50%': { transform: 'scale(1.1)' },
        }
      },
      animation: {
        'waiting': 'waiting ease-in-out 3s infinite',
      }
    },
    fontFamily: {
      display: ["Lato", "sans-serif"],
      body: ["Lato", "sans-serif"],
      sans: ["Lato", "sans-serif"],
    }
  },
  plugins: [],
}
