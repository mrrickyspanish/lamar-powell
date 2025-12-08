# Lamarin Powell - Dual-Sport Athlete Website

A modern, interactive website showcasing Lamarin Powell's achievements as a dual-sport athlete in football and basketball.

## Features

- **Dynamic Sport Switching**: Toggle between football and basketball profiles with smooth animations
- **Real-Time Stats**: Display key performance metrics for each sport
- **Film Highlights**: Embedded HUDL highlight reels with full game links
- **Recruiter Contact Form**: Direct communication with confetti success animation
- **Glassmorphic Design**: Modern UI with backdrop blur effects and transparent cards
- **Framer Motion Animations**: Smooth transitions between sports and content
- **URL Query Params**: Shareable deep links with `?sport=` parameter
- **Responsive Layout**: Optimized for all screen sizes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Confetti**: canvas-confetti
- **State Management**: React Context API
- **Backend**: Supabase (for lead capture)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
lamar-powell/
├── app/
│   ├── layout.tsx          # Root layout with SportProvider
│   ├── page.tsx            # Home page with AthleteHero
│   └── globals.css         # Global styles
├── components/
│   └── sport/
│       ├── SportContext.tsx    # Context for sport state management
│       ├── sportContent.ts     # Content data for both sports
│       ├── AthleteHero.tsx     # Main hero component
│       └── index.ts            # Exports
└── public/
    ├── football-hero.jpg       # Football hero image
    ├── basketball-hero.jpg     # Basketball hero image
    └── athlete-hero.jpg        # General athlete image
```

## Components

### SportContext
Provides global state management for the currently selected sport (football or basketball) with URL query param sync.

### AthleteHero
Main hero section featuring:
- Sport selector toggle
- Animated name and position
- Dynamic tagline and description
- Performance statistics in glassmorphic cards
- Sport-specific color themes and hero images
- CTA button with smooth scroll to contact form

### AthleteStats
Dedicated stats section with:
- Responsive grid (2-col mobile → 4-col desktop)
- Glassmorphic stat cards
- Staggered fade-in animations on sport change

### HighlightsSection
Film showcase featuring:
- Embedded HUDL highlight reel with aspect-video iframe
- Full game film button grid with external links
- Sport-specific gradient theming

### RecruiterForm
Contact form with:
- Name, Email, School/Program, Message fields
- Hidden sport field (captures current sport interest)
- Supabase integration for lead capture
- Canvas-confetti success animation
- Success state: "Film sent – Torey replies fast"

### sportContent
Data structure containing:
- Athlete information
- Position and tagline
- Performance statistics
- Sport-specific color schemes
- Hero image paths
- HUDL highlight and full game URLs

## Supabase Setup

### Database Schema

Create a `recruiter_messages` table in your Supabase project:

```sql
CREATE TABLE recruiter_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sport TEXT NOT NULL CHECK (sport IN ('football', 'basketball')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  school TEXT,
  role TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX idx_recruiter_messages_created_at ON recruiter_messages(created_at DESC);
CREATE INDEX idx_recruiter_messages_sport ON recruiter_messages(sport);
CREATE INDEX idx_recruiter_messages_email ON recruiter_messages(email);

-- Enable Row Level Security (RLS)
ALTER TABLE recruiter_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from anyone (public form submissions)
CREATE POLICY "Allow public insert" ON recruiter_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read messages
CREATE POLICY "Authenticated users can read" ON recruiter_messages
  FOR SELECT
  TO authenticated
  USING (true);
```

### Environment Variables

Create a `.env.local` file:

```env
# Public URL (safe to expose to clients)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Service Role Key (NEVER expose to clients, server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and should NEVER be exposed to the client. It's used server-side only in the API route.

### API Route

The API route is already implemented at `app/api/recruiter/route.ts`. It:
- Validates required fields (sport, name, email)
- Inserts data into the `recruiter_messages` table
- Returns success/error responses
- Uses the Supabase admin client for secure server-side operations

## Customization

Update athlete information in `components/sport/sportContent.ts`:
- Modify stats, descriptions, and taglines
- Change color schemes for each sport
- Update hero image paths
- Add real HUDL embed URLs

## License

This project is created for Lamarin Powell's personal athletic portfolio.
