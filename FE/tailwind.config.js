/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "toast-animation": "toast 0.4s",
        "form-aimation": "form 0.4s",
      },
    },
    keyframes: {
      toast: {
        "0%": { transform: "translateY(-50%)", opacity: "0" },
        "100%": { transform: "translateY(0%)", opacity: "100" },
      },
      form: {
        "0%": { transform: "translateY(-15%)", opacity: "0" },
        "100%": { transform: "translateY(0%)", opacity: "100" },
      },
    },
  },
  plugins: [],
};
 
