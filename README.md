# CinePulse PRO — Next-Gen Cinematic Video Stream & Gallery Platform

A state-of-the-art, high-performance video streaming web application built with **React**, **Vite**, and **Vanilla CSS**. CinePulse PRO features **three unique gallery layouts**, **two single-video screening consoles**, working streaming sources (MP4, YouTube, Vimeo), and ultra-premium dark glassmorphic aesthetics.

---

## ✨ Features & Architecture

### 🎬 1. Three Innovative Gallery Layouts
- **Layout 1: Explorer Grid Showcase**
  - Spotlight Hero Banner with live play/preview CTA.
  - Category navigation pills (Sci-Fi, Animation, Nature, Tech, Lo-Fi).
  - Provider filters (Direct MP4, Vimeo, YouTube 4K).
  - Live search bar and Watchlist management.
  - Dual view modes: Spacious Multi-Column Grid or Compact Streamlined Rows.

- **Layout 2: Continuous Zigzag Bento Matrix**
  - Inspired by modern editorial bento-box UI.
  - 4-card repeating structure:
    - **1 Big Featured Card** (2 cols x 2 rows) with rotating award badges (`★ Film of the Month`, `★ Editor's Choice`), resolution chips, synopsis, and instant "Watch Now" action.
    - **1 Tall Card** (1 col x 2 rows) with full-height atmospheric visuals.
    - **2 Stacked Cards** (1 col x 1 row each) with metadata and views.
  - **Alternating Zigzag Perspective**: Every row alternates column placement (`[Big | Tall | Stacked]`, `[Stacked | Tall | Big]`, `[Tall | Big | Stacked]`, etc.) creating an engaging visual rhythm while preserving structural consistency.

- **Layout 3: CineStudio Master Stream & Split Console**
  - **Sticky Master Reel Monitor (Left)**: Live video feed with CRT scanlines overlay, signal codes (`STREAM 4K // CH-01`), 5-band animated audio equalizer bars, and Sound ON/Mute toggle.
  - **Modular Masonry Feed (Right)**: Click any card to launch full screening, or click the **Zap (Preview)** button to instantly route the video into the left master monitor.

---

### 🎥 2. Two Single Video Details Layouts
- **Details Layout 1: Classic Cinema Experience**
  - Dynamic ambient glow lighting synchronizing with video playback.
  - Theater mode toggle for wide-angle viewing.
  - Like/Dislike live counters and Watchlist toggle.
  - Interactive chapter timestamps with quick seeking.
  - User review & commentary composer with instant publishing.
  - Related video queue sidebar.

- **Details Layout 2: IMAX Stage & 3-Column Studio Console**
  - **IMAX 2.39:1 Cinema Stage (Top)**: Full-bleed anamorphic screen with atmospheric glowing halo backdrop.
  - **Column 1 (Film Tech Specs & Studio Profile)**: 4K UHD 3840x2160, 2.39:1 Anamorphic, Dolby Atmos 5.1, DCI-P3 10-Bit HDR, creator subscription toggle, and direct MP4 download link.
  - **Column 2 (Interactive Storyboard & Audience Critiques)**: Horizontal scene cue cards with timestamps + 5-Star verified audience critique system with star picker.
  - **Column 3 (Director's Reel Queue)**: Curated next-up playlist with hover previews.
  - **Floating Layout Switcher**: Instantly flip between Details Layout 1 and Details Layout 2 at any time.

---

### 📦 3. Working Video Dataset
Includes 20 high-definition, verified working videos:
- **Direct MP4 Streams**: *Tears of Steel*, *Big Buck Bunny*, *Sintel*, *Elephants Dream*, *Cosmic Nebulae*, *Festival of Colors*, etc.
- **Embedded Players**: 4K Nature, Ray-Traced Tech, and Chillhop Lo-Fi audio.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation
```bash
# Clone the repository
git clone https://github.com/swapnilsingh093/video-gallery.git

# Navigate into the project directory
cd video-gallery

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be running locally at `http://localhost:5173/`.

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS (CSS Grid, Flexbox, Glassmorphism, Micro-animations)
- **Icons**: Lucide React
- **Video Players**: Native HTML5 Video & Responsive IFrames

---

## 📄 License
MIT License. Open-source films provided by the Blender Foundation and royalty-free creative commons streams.
