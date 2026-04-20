/** @type {import('postcss-load-config').Config} */
// Use the new PostCSS plugin package for Tailwind v4.
// The project declares @tailwindcss/postcss in devDependencies so include
// it unconditionally to ensure the @tailwind directives are processed.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}

export default config;
