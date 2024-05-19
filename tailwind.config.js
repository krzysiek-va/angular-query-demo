/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      listStyleImage: {
        checkmarkGreen: 'url("/checkmark-green.svg")',
        checkmark: 'url("/checkmark.svg")',
      },
      backgroundImage: {
        trash: "url('/trash.svg')",
      },
    },
  },
  plugins: [],
};
