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
        danger: "#ee2624"
      },
      boxShadow: {
        "3xl": "0px 10px 30px 0px rgba(82,63,105,.05)"
      },
      fontFamily: {
        'cherry': ['Cherry Bomb One']
      },
      aspectRatio: {
        '0/8': '0.8',
        '4/5': '4/5'
      },
      backgroundImage: {
        'pattern': "linear-gradient(-180deg,transparent 5%,rgba(0,0,0,.4) 51%,rgba(0,0,0,.6))",
      }
    },
  }
};
