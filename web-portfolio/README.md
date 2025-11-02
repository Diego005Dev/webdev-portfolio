# Retro Era Portfolio

A portfolio website that showcases different retro computing eras with unique visual styles for each era. The site features responsive design, internationalization support, and interactive elements styled according to each computing era.

![Retro Portfolio Preview](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pacman.jpg-5x2rd66DqO81J1d3vTFaT1J29lAazk.jpeg)

## Internationalization (i18n)

This portfolio supports automatic language detection based on browser preferences:

- **Automatic Detection**: The site automatically detects the user's preferred language from browser settings
- **Supported Languages**: English (en) and Spanish (es)
- **Fallback**: Defaults to English if the detected language is not supported
- **Manual Override**: Users can manually switch languages using the language switcher in the header

### How Language Detection Works

1. When a user visits the root URL (`/`), the middleware detects their browser's `Accept-Language` header
2. The system matches the preferred language against supported locales using `intl-localematcher`
3. Users are automatically redirected to the appropriate language route (`/en` or `/es`)
4. The language preference is maintained throughout navigation

### Testing Language Detection

To test the automatic language detection:

1. **Firefox/Chrome**: Go to Settings → Language and set Spanish as preferred
2. **Clear browser cache** and visit the site - it should redirect to Spanish
3. **Browser DevTools**: Check Network tab to see the redirect from `/` to `/es`

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Internationalization with custom dictionary implementation
- CSS animations and transitions
- Middleware for language detection and routing

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
   cd retro-era-portfolio
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components including era-specific themes
- `/dictionaries` - Language files for internationalization
- `/public` - Static assets like images
- `/lib` - Utility functions

## Deployment

This project is configured for easy deployment on Vercel:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

The static export will be generated in the `out` directory.

## Customization

### Adding a New Language

1. Create a new JSON file in the `/dictionaries` directory (e.g., `fr.json`)
2. Add the language to the supported locales in `middleware.ts`
3. Update the `generateStaticParams` function in `app/[lang]/layout.tsx`

### Adding New Projects

Update the project data in the `projects` array in `components/portfolio-content.tsx` and add corresponding translations in the dictionary files.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Copyright (c) [Your Name]

## Acknowledgments

- Font families: Press Start 2P, VT323, and Orbitron from Google Fonts
- Inspiration from classic video game consoles and computing eras
