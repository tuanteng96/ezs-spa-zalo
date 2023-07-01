module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        separator: "#f4f4f4",
        gray: "#767A7F",
        app: "#ee4d2d",
        muted: "#a1a5b7",
        danger: "#ee2624",
        success: "#00bfa5",
        warning: '#FFA800',
        primary: '#3699FF',
        gray: {
          100: "#f9f9f9",
          200: "#F4F4F4",
          300: "#d5d7da",
          400: "#B5B5C3",
          500: "#a1a5b7",
          600: "#7e8299",
          700: "#5E6278",
          800: "#3F4254",
          900: "#222222",
        },
      },
      boxShadow: {
        "3xl": "0px 10px 30px 0px rgba(82,63,105,.05)",
        "4xl": "0 0 40px 0 rgba(82,63,105,.1)",
        "5xl": "0 3px 20px rgba(0,0,0,.04)"
      },
      fontFamily: {
        cherry: ["Cherry Bomb One"],
      },
      aspectRatio: {
        "0/6": "0.6",
        "0/7": "0.7",
        "0/8": "0.8",
        "4/5": "4/5",
        "5/3": "5/3",
      },
      backgroundImage: {
        pattern:
          "linear-gradient(-180deg,transparent 5%,rgba(0,0,0,.4) 51%,rgba(0,0,0,.6))",
      },
      padding: {
        "safe": "var(--zaui-safe-area-inset-top, 0px)",
        "safe-bottom": "var(--zaui-safe-area-inset-bottom, 0px)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ]
};
