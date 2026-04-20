/** @type {import('postcss-load-config').Config} */
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const plugins = {}

// Include tailwind postcss plugin only if it's installed. This avoids
// breaking test runs in environments where the plugin isn't available.
try {
  require.resolve('@tailwindcss/postcss')
  plugins['@tailwindcss/postcss'] = {}
} catch (e) {
  // plugin not installed; skip
}

// autoprefixer is expected to be available as a devDependency
try {
  require.resolve('autoprefixer')
  plugins['autoprefixer'] = {}
} catch (e) {
  // ignore
}

const config = { plugins }

export default config;
