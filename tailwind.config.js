  /** @type {import('tailwindcss').Config} */
  module.exports = {
    mode: "jit",
    content: [
      "./application/views/**/*.ejs",
      "./public/javascript/**/*.js",
    ],
    theme: {
      extend: {
        container: {
          center: true,
        },
      },
    },
    plugins: [
      {
        tailwindcss: {},
        autoprefixer: {},
      },
    ],
  };