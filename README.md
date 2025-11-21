# Suellen Doykarin - Developer Portfolio

A modern, responsive portfolio showcasing my skills and experience as a Senior Software Engineer specializing in Java, Kotlin, Spring Boot, and blockchain technologies.

## Technologies Used

- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Framer Motion (Animations)
- next-themes (Dark/Light Mode)
- Lucide React (Icons)
- Shadcn UI Components
- Vercel (Deployment)

## Features

- Fully responsive design
- Dark/light mode toggle
- Animated sections with Framer Motion
- SEO optimized with proper meta tags
- Accessibility focused (WCAG compliant)
- Modern UI with clean aesthetics
- Performance optimized

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables

This project doesn't require any environment variables for basic functionality.

## Deployment

This project is designed for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect the Next.js project and deploy it

Or deploy manually using the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
portfolio/
├── app/                  # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── projects/
│   ├── skills/
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # Reusable React components
│   ├── ui/             # Shadcn UI components
│   ├── animated-section.tsx
│   ├── container.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── skill-icon.tsx
│   └── theme-provider.tsx
├── lib/                # Utility functions
│   └── utils.ts
├── content/            # MDX content for case studies
└── public/             # Static assets
```

## Accessibility Features

- Semantic HTML markup
- Proper heading hierarchy
- Sufficient color contrast
- Keyboard navigation support
- ARIA attributes where appropriate
- Focus indicators
- Screen reader friendly content

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).