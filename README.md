# JumpaLagi (The Reunion Hub)

<!-- README-I18N:START -->

**English** | [Bahasa Indonesia](./README.id.md)

<!-- README-I18N:END -->

JumpaLagi is a premium, nostalgic, and modern web application designed for family, class, and corporate reunion planning. Built specifically for multi-generational users, it provides curated packages (Bandung, Dieng, Solo), venue details, interactive 3D map exploration, and consultation services to take the hassle out of planning reunions.

## 🚀 Features

- **Multilingual Support**: Supports both English (EN) and Bahasa Indonesia (ID) toggles at runtime.
- **Curated Packages**: Dynamic catalog filtering for scenic tour packages like Bandung, Dieng, and Solo.
- **Interactive 3D Maps**: Immersive maps showcasing reunion destinations and venue outlines.
- **Consultation Forms**: Fully integrated modal form using the Resend API to deliver automated custom HTML reservation and consultation emails.
- **Premium Responsive Design**: Follows a nostalgic, modern, and accessible theme with rich contrast and custom Montserrat/Inter typography.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Style**: Tailwind CSS & Vanilla CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email API**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Getting Started

First, install the dependencies:

```bash
npm install
```

Next, configure your environmental variables in a `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## 📁 Project Structure

- `src/app/` - Next.js App Router folders (pages: home, about, contact, paket).
- `src/components/` - Interactive components (Hero, Navbar, PackageCatalog, Map3D, ConsultationModal, Footer).
- `src/contexts/` - Global context providers for language preferences and modal visibility.
- `src/lib/` - Shared utilities and helpers.
- `src/templates/` - HTML templates for system/notification emails.

## 🚀 Deployment (Vercel)

You can easily deploy JumpaLagi to Vercel using the following steps:

1. **Import the Project**: Link your GitHub repository to Vercel.
2. **Environment Variables**: In the Vercel project settings, configure the following environment variable:
   - `RESEND_API_KEY`: Your production Resend API Key.
3. **Region Configuration (Important)**: For optimal latency and response times targeting Southeast Asia, set the Vercel Function region to **Singapore (sin1)** in your project settings (`vercel.json` or Vercel dashboard).
4. **Deploy**: Trigger a deployment from your `master` branch.

## 📄 License

This project is proprietary and confidential. All rights reserved.
