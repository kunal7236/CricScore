Prompt for Recreating CRIC.DASH Vintage UI

Project Setup

You are building a cricket score dashboard with a minimal vintage aesthetic.
Use React + TypeScript + Tailwind CSS as the styling framework.
Font stack: Cormorant Garamond (serif headings) + DM Sans (body text).


Color Palette (CSS Variables / Tailwind Extended)

css

--cream: #FDF8F3        /* Main background */
--parchment: #EDE4D8    /* Borders, dividers */
--charcoal: #2C2825     /* Primary text */
--gold: #B8956C         /* Accents, highlights */
--gold-dark: #A07D52    /* Gradient end */
--burgundy: #8B4049     /* Live badge, wicket */
--forest: #4A5D4A       /* Second innings accent */


Tailwind Config Extended Colors

javascript

// Add to tailwind.config.js theme.extend.colors
cream: '#FDF8F3',
parchment: '#EDE4D8',
charcoal: '#2C2825',
gold: '#B8956C',
goldDark: '#A07D52',
burgundy: '#8B4049',
forest: '#4A5D4A',

// Font family
fontFamily: {
  'serif': ['Cormorant Garamond', 'Georgia', 'serif'],
  'sans': ['DM Sans', 'system-ui', 'sans-serif'],
}


CSS Utilities (Add to index.css)

css

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  /* Vintage Card with gold top border */
  .vintage-card {
    @apply bg-white border border-[#EDE4D8] rounded-lg relative overflow-hidden;
  }
  .vintage-card::before {
    content: '';
    @apply absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B8956C] to-[#A07D52];
  }

  /* Status Badges */
  .vintage-badge {
    @apply inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider;
  }
  .vintage-badge-live {
    @apply bg-red-50 text-[#8B4049];
  }
  .vintage-badge-completed {
    @apply bg-stone-100 text-[#6B5B4F];
  }

  /* Section Divider */
  .vintage-divider {
    @apply flex items-center gap-4 my-6;
  }
  .vintage-divider::before,
  .vintage-divider::after {
    content: '';
    @apply flex-1 h-px bg-[#EDE4D8];
  }

  /* Score Display */
  .score-display {
    @apply font-serif font-bold leading-none;
  }

  /* Slow pulse animation for live indicator */
  .animate-pulse-slow {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}


Google Fonts (Add to index.html)

HTML
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">


Component Styling Guidelines

1. Dashboard Page


    Container: max-w-3xl mx-auto px-4 py-8 md:py-12

    Header: Centered with ornamental lines (gold w-8 h-px), serif title text-3xl md:text-5xl, uppercase subtitle tracking

    Match Grid: grid grid-cols-1 sm:grid-cols-2 gap-4

    Cards: Use .vintage-card, padding p-5, hover hover:shadow-lg hover:border-[#B8956C]

    Badge: Use .vintage-badge with .vintage-badge-live or .vintage-badge-completed

    Live dot: w-1.5 h-1.5 rounded-full bg-[#8B4049] animate-pulse-slow


2. Scoreboard Component


    Innings Cards: Use .vintage-card p-5, second innings has border-top: 3px solid #4A5D4A

    Score: Use .score-display text-4xl

    Stats Grid: grid grid-cols-2 md:grid-cols-4 gap-3 with colored backgrounds (blue/amber/purple/emerald at 10% opacity)

    Player Cards: Use .vintage-card p-4, internal stats in grid grid-cols-3 gap-2 with bg-[#F5EDE4] cells

    Status Bar: bg-[#2C2825] rounded-md p-4 text-center text-[#FDF8F3]


3. Commentary Item


    Container: flex gap-4 p-4 rounded-lg border transition-all hover:shadow-md

    Ball Indicator: w-10 h-10 rounded-lg text-xs font-bold with contextual colors

    Event-based Colors:

        Wicket: bg-red-50 border-red-100, indicator bg-[#8B4049]

        Six: bg-amber-50 border-amber-100, indicator bg-[#B8956C]

        Four: bg-blue-50 border-blue-100, indicator bg-blue-600

        Normal: bg-white border-[#EDE4D8], indicator bg-[#2C2825]



4. MatchDetails Page


    Back Button: flex items-center gap-2 text-sm font-medium text-[#6B5B4F] hover:text-[#2C2825]

    Section Divider: Use .vintage-divider with w-1 h-6 bg-[#B8956C] rounded-full as icon

    Commentary List: space-y-3 container


5. MatchCard Component


    Card: Use .vintage-card p-5 h-full

    Structure: Flex column, badge at top, title in middle, footer at bottom with border-top

    Footer: Match ID (uppercase, small) left, "View" + arrow right

    Hover: Arrow translates with group-hover:translate-x-1


Responsive Breakpoints

Mobile:   px-4, single column, comfortable padding
sm (640): 2-column grids for matches
md (768): Larger padding, 4-column stats
lg (1024): Full size typography


Design Principles

    1.
    Minimal but stylish: Clean layouts, no clutter
    2.
    Vintage warmth: Cream backgrounds, gold accents, serif headings
    3.
    Subtle animations: Slow pulse for live, smooth hover transitions
    4.
    Consistent spacing: Use Tailwind's spacing scale (4, 5, 6 for padding)
    5.
    Contextual colors: Different accent colors for different ball events
    6.
    Ornamental details: Small decorative lines and dots add sophistication


Tailwind Classes Reference






















































Element	Classes
Page Container	min-h-screen bg-[#FDF8F3] px-4 py-8 md:py-12
Card Container	vintage-card p-5 h-full transition-all duration-300 hover:shadow-lg
Serif Heading	text-2xl md:text-3xl font-serif font-semibold text-[#2C2825]
Body Text	text-sm text-[#2C2825] font-medium
Muted Text	text-xs text-[#8B7B6F]
Badge	vintage-badge vintage-badge-live or .vintage-badge-completed
Live Dot	w-1.5 h-1.5 rounded-full bg-[#8B4049] animate-pulse-slow
Divider	vintage-divider
Score	score-display text-4xl
Stats Cell	bg-[#F5EDE4] rounded p-2 text-center
Button	px-4 py-2 bg-[#2C2825] text-[#FDF8F3] rounded hover:bg-[#B8956C] transition-colors