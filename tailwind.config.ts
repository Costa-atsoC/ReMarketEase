import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        //primary: "#f5e6d0", //this is the background colour
        //header: "#9e7b5c", //this is the header background colour
        //secondary: "#ffed4a",
        //gray: "#ececec",
      },
      colors: {
        //header: "#9e7b5c", //text colour header
        //primary: "#f5e6d0", //text colour
        //secondary: "#755335", //text colour
      },
      borderColor: {
        //border: "#9e7b5c", //border colour
        //primary: "#f5e6d0", //border colour
        //secondary: "#755335",
      },
    },
  },
  //plugins: [require("daisyui")],
} satisfies Config;
