# Retro Era Portfolio

A portfolio website that showcases different retro computing eras with unique visual styles for each era. The site features responsive design, internationalization support, and interactive elements styled according to each computing era.

![Retro Portfolio Preview](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pacman.jpg-5x2rd66DqO81J1d3vTFaT1J29lAazk.jpeg)

## Features

- Three distinct visual themes representing different computing eras:
  - 8-bit era (1980s): Gameboy-inspired pixelated design with limited color palette
  - 16-bit era (1990s): SNES/Genesis-inspired design with more colors and smoother edges
  - 32-bit era (Late 1990s/Early 2000s): PlayStation/N64-inspired design with gradients and modern UI elements
- Responsive design that works on mobile, tablet, and desktop
- Internationalization support (English and Spanish)
- Custom Pac-Man themed loading animations for each era
- Interactive project cards with expandable descriptions
- Contact links with era-appropriate hover effects
- Smooth transitions between eras

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
