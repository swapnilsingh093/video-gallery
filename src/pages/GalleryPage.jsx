import React, { useState } from 'react';
import { Play, Bookmark, Sparkles, Filter, Grid3X3, List, Layers, Eye, RefreshCw } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { CATEGORIES } from '../data/videos';

export default function GalleryPage({
  videos,
  onSelectVideo,
  watchlist,
  onToggleWatchlist,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  showWatchlistOnly,
  setShowWatchlistOnly
}) {
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  // Pick the top featured video for the hero spotlight
  const featuredVideo = videos.find(v => v.featured) || videos[0];

  // Filtering logic
  let filteredVideos = videos.filter(v => {
    // Watchlist filter
    if (showWatchlistOnly && !watchlist.includes(v.id)) {
      return false;
    }
    // Category filter
    if (activeCategory !== 'All' && v.category !== activeCategory) {
      return false;
    }
    // Provider filter
    if (selectedProvider !== 'all' && v.type !== selectedProvider) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchDesc = v.description.toLowerCase().includes(q);
      const matchChannel = v.channel.name.toLowerCase().includes(q);
      const matchTags = v.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchChannel || matchTags;
    }
    return true;
  });

  // Sorting logic
  if (sortBy === 'views') {
    filteredVideos = [...filteredVideos].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
  }

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedProvider('all');
    setSortBy('trending');
    setSearchQuery('');
    setShowWatchlistOnly(false);
  };

  return (
    <div className="gallery-page" id="gallery-page">
      {/* Hero Featured Video Banner (Shown on default explore view) */}
      {!searchQuery && !showWatchlistOnly && activeCategory === 'All' && featuredVideo && (
        <section className="hero-featured-banner" id="hero-featured-banner">
          <div className="hero-banner-backdrop">
            <img 
              src={featuredVideo.thumbnail} 
              alt={featuredVideo.title} 
              className="hero-backdrop-img"
            />
            <div className="hero-gradient-overlay"></div>
            <div className="hero-ambient-aura"></div>
          </div>

          <div className="hero-banner-content">
            <div className="hero-spotlight-badge">
              <span className="pulse-dot"></span>
              <Sparkles size={14} />
              <span>PREMIERE SPOTLIGHT</span>
              <span className="badge-divider">|</span>
              <span className="hero-format-pill">{featuredVideo.badge}</span>
            </div>

            <h1 className="hero-video-title">
              {featuredVideo.title}
            </h1>

            <p className="hero-video-desc">
              {featuredVideo.description}
            </p>

            <div className="hero-meta-row">
              <div className="hero-channel-item">
                <img src={featuredVideo.channel.avatar} alt={featuredVideo.channel.name} className="hero-avatar" />
                <span className="hero-channel-name">{featuredVideo.channel.name}</span>
              </div>
              <span className="dot-sep">•</span>
              <span className="hero-stat-pill"><Eye size={14} /> {featuredVideo.views} views</span>
              <span className="dot-sep">•</span>
              <span className="hero-category-pill">{featuredVideo.category}</span>
              <span className="dot-sep">•</span>
              <span className="hero-duration-pill">{featuredVideo.duration}</span>
            </div>

            <div className="hero-action-buttons">
              <button 
                type="button" 
                className="hero-play-btn"
                onClick={() => onSelectVideo(featuredVideo)}
                id="hero-watch-now-btn"
              >
                <Play fill="#0f172a" size={20} />
                <span>Watch Premiere</span>
              </button>

              <button 
                type="button" 
                className={`hero-save-btn ${watchlist.includes(featuredVideo.id) ? 'saved' : ''}`}
                onClick={() => onToggleWatchlist(featuredVideo.id)}
                id="hero-save-btn"
              >
                <Bookmark fill={watchlist.includes(featuredVideo.id) ? '#6366f1' : 'none'} size={18} />
                <span>{watchlist.includes(featuredVideo.id) ? 'Saved in Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Container */}
      <div className="gallery-main-container">
        {/* Watchlist Banner Notice if active */}
        {showWatchlistOnly && (
          <div className="watchlist-banner-header" id="watchlist-header-alert">
            <div className="w-banner-info">
              <Bookmark size={24} className="accent-icon" />
              <div>
                <h2>Your Saved Watchlist</h2>
                <p>You have {watchlist.length} saved video{watchlist.length === 1 ? '' : 's'} queued to stream.</p>
              </div>
            </div>
            <button 
              type="button" 
              className="view-all-library-btn"
              onClick={() => setShowWatchlistOnly(false)}
            >
              Browse All Videos
            </button>
          </div>
        )}

        {/* Filter and Control Toolbar */}
        <div className="filter-controls-toolbar" id="filter-controls-toolbar">
          {/* Categories Pill Bar */}
          <div className="category-pills-scroll" role="tablist" aria-label="Video Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowWatchlistOnly(false);
                }}
                id={`cat-pill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls Bar */}
          <div className="secondary-controls-bar">
            {/* Left: Results Count */}
            <div className="results-counter">
              <span className="count-number">{filteredVideos.length}</span>
              <span className="count-label">Videos available</span>
              {(activeCategory !== 'All' || selectedProvider !== 'all' || searchQuery || showWatchlistOnly) && (
                <button 
                  type="button" 
                  className="reset-filters-btn" 
                  onClick={handleResetFilters}
                  title="Clear all filters"
                >
                  <RefreshCw size={13} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Right: Platform Filter & Sort & View Mode */}
            <div className="dropdowns-and-views">
              {/* Platform Selector */}
              <div className="select-wrapper">
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="custom-select"
                  id="platform-filter-select"
                  aria-label="Filter by Video Platform"
                >
                  <option value="all">All Sources (MP4 / YT / Vimeo)</option>
                  <option value="mp4">4K MP4 Streams Only</option>
                  <option value="youtube">YouTube 4K Only</option>
                  <option value="vimeo">Vimeo Cinema Only</option>
                </select>
              </div>

              {/* Sort By Selector */}
              <div className="select-wrapper">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="custom-select"
                  id="sort-by-select"
                  aria-label="Sort Videos"
                >
                  <option value="trending">Sort: Trending</option>
                  <option value="views">Sort: Most Viewed</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="view-toggle-group">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid Layout"
                  aria-label="Grid Layout"
                >
                  <Grid3X3 size={17} />
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                  onClick={() => setViewMode('compact')}
                  title="Compact List Layout"
                  aria-label="Compact List Layout"
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid Section */}
        {filteredVideos.length > 0 ? (
          <div className={`videos-display-wrapper ${viewMode === 'compact' ? 'compact-list-mode' : 'grid-mode'}`} id="videos-grid">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSelectVideo={onSelectVideo}
                isWatchlisted={watchlist.includes(video.id)}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="empty-results-box" id="empty-search-state">
            <div className="empty-icon-wrap">
              <Layers size={40} className="empty-icon" />
            </div>
            <h3>No Videos Found Matching Your Criteria</h3>
            <p>Try searching for different keywords or reset your filters to explore our full library.</p>
            <button 
              type="button" 
              className="empty-reset-btn"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
