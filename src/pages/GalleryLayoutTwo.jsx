import React, { useState } from 'react';
import { Play, Star, Zap, Sparkles } from 'lucide-react';

export default function GalleryLayoutTwo({
  videos,
  onSelectVideo,
  watchlist,
  onToggleWatchlist,
  activeCategory = 'All',
  setActiveCategory,
  searchQuery = '',
  setSearchQuery,
  showWatchlistOnly = false,
  setShowWatchlistOnly
}) {
  const [localCategory, setLocalCategory] = useState('All');
  const currentCategory = activeCategory || localCategory;
  const setCategory = setActiveCategory || setLocalCategory;

  const categories = ["All", "Sci-Fi & Cinema", "Animation", "Nature & Space", "Tech & Future", "Music & Lofi"];

  // Filter videos by category, search query, and watchlist
  let filteredVideos = videos;

  if (showWatchlistOnly) {
    filteredVideos = filteredVideos.filter(v => watchlist.includes(v.id));
  }

  if (currentCategory !== 'All') {
    filteredVideos = filteredVideos.filter(v => v.category === currentCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredVideos = filteredVideos.filter(v => 
      v.title.toLowerCase().includes(q) || 
      v.description.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.channel.name.toLowerCase().includes(q)
    );
  }

  // Chunk videos into sets of 4 for each Bento section
  const chunks = [];
  for (let i = 0; i < filteredVideos.length; i += 4) {
    chunks.push(filteredVideos.slice(i, i + 4));
  }

  // Spotlight badges that rotate for each big card
  const spotlightBadges = [
    "Film of the Month",
    "Editor's Spotlight",
    "Critic's Selection",
    "Grand Premiere",
    "Director's Cut"
  ];

  return (
    <div className="layout-two-container" id="gallery-layout-two">
      {/* Sleek Header Strip with Category Filter */}
      <div className="bento-page-header">
        <div className="bento-header-info">
          <div className="bento-badge-pill">
            <Zap size={13} className="pulse-yellow" />
            <span>ZIGZAG BENTO MATRIX</span>
          </div>
          <h1 className="bento-header-title">CinePulse Bento Showcase</h1>
          <p className="bento-header-desc">
            4-Card asymmetrical visual blocks repeating in continuous alternating zigzag perspective
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="bento-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`bento-filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Repeating Bento Sections in Zigzag Form */}
      <div className="bento-zigzag-stream">
        {chunks.map((chunk, blockIdx) => {
          // Exactly 4 items per chunk:
          // Item 0: Big Featured Card (spans 2 cols, 2 rows)
          // Item 1: Tall Atmospheric Card (spans 1 col, 2 rows)
          // Item 2: Medium Stacked Card 1 (spans 1 col, 1 row)
          // Item 3: Medium Stacked Card 2 (spans 1 col, 1 row)
          const cardBig = chunk[0];
          const cardTall = chunk[1];
          const cardStack1 = chunk[2];
          const cardStack2 = chunk[3];

          // 5 alternating zigzag patterns:
          // Pattern 0: [ Big (2 cols) ] [ Tall (1 col) ] [ Stacked (1 col) ]  (Matches user's screenshot!)
          // Pattern 1: [ Stacked (1 col) ] [ Tall (1 col) ] [ Big (2 cols) ]  (Mirrored/Reversed)
          // Pattern 2: [ Tall (1 col) ] [ Big (2 cols) ] [ Stacked (1 col) ]  (Center Big)
          // Pattern 3: [ Stacked (1 col) ] [ Big (2 cols) ] [ Tall (1 col) ]  (Inverted Center)
          // Pattern 4: [ Big (2 cols) ] [ Stacked (1 col) ] [ Tall (1 col) ]  (Center Stacked)
          const patternIdx = blockIdx % 5;
          const badgeText = spotlightBadges[blockIdx % spotlightBadges.length];

          return (
            <section
              key={blockIdx}
              className={`bento-zigzag-block bento-pattern-${patternIdx}`}
              id={`bento-block-${blockIdx + 1}`}
            >
              {/* 1. BIG FEATURED CARD */}
              {cardBig && (
                <div
                  className="bento-box bento-huge-feature card-big"
                  onClick={() => onSelectVideo(cardBig)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(cardBig)}
                >
                  <img src={cardBig.thumbnail} alt={cardBig.title} className="bento-bg-img" loading="lazy" />
                  <div className="bento-overlay-gradient"></div>

                  {/* Top Badges */}
                  <div className="bento-badge-top">
                    <span className="bento-tag gold-tag">
                      <Star size={12} fill="currentColor" /> {badgeText}
                    </span>
                    <span className="bento-tag dark-res-tag">{cardBig.badge || '4K HDR'}</span>
                  </div>

                  {/* Bottom Content */}
                  <div className="bento-content-bottom">
                    <span className="bento-category-label">{cardBig.category}</span>
                    <h3 className="bento-title-huge">{cardBig.title}</h3>
                    <p className="bento-desc-short">{cardBig.description}</p>

                    <div className="bento-action-row">
                      <button type="button" className="bento-quick-play">
                        <Play size={14} fill="#0f172a" />
                        <span>Watch Now</span>
                      </button>
                      <span className="bento-duration-pill">{cardBig.duration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TALL CARD */}
              {cardTall && (
                <div
                  className="bento-box bento-tall-card card-tall"
                  onClick={() => onSelectVideo(cardTall)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(cardTall)}
                >
                  <img src={cardTall.thumbnail} alt={cardTall.title} className="bento-bg-img" loading="lazy" />
                  <div className="bento-overlay-gradient"></div>

                  <div className="bento-content-bottom">
                    <span className="bento-category-label">{cardTall.category}</span>
                    <h4 className="bento-title-medium">{cardTall.title}</h4>
                    <span className="bento-meta-duration">
                      {cardTall.duration} • {cardTall.views} views
                    </span>
                  </div>
                </div>
              )}

              {/* 3. STACKED CARD 1 (TOP) */}
              {cardStack1 && (
                <div
                  className="bento-box bento-medium-card card-stack-1"
                  onClick={() => onSelectVideo(cardStack1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(cardStack1)}
                >
                  <img src={cardStack1.thumbnail} alt={cardStack1.title} className="bento-bg-img" loading="lazy" />
                  <div className="bento-overlay-gradient"></div>

                  <div className="bento-content-bottom">
                    <span className="bento-category-label">{cardStack1.category}</span>
                    <h4 className="bento-title-medium">{cardStack1.title}</h4>
                    <span className="bento-meta-duration">
                      {cardStack1.duration} • {cardStack1.views}
                    </span>
                  </div>
                </div>
              )}

              {/* 4. STACKED CARD 2 (BOTTOM) */}
              {cardStack2 && (
                <div
                  className="bento-box bento-medium-card card-stack-2"
                  onClick={() => onSelectVideo(cardStack2)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(cardStack2)}
                >
                  <img src={cardStack2.thumbnail} alt={cardStack2.title} className="bento-bg-img" loading="lazy" />
                  <div className="bento-overlay-gradient"></div>

                  <div className="bento-content-bottom">
                    <span className="bento-category-label">{cardStack2.category}</span>
                    <h4 className="bento-title-medium">{cardStack2.title}</h4>
                    <span className="bento-meta-duration">
                      {cardStack2.duration} • {cardStack2.views}
                    </span>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
