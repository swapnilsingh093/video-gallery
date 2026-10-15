import React, { useState } from 'react';
import { Play, Search, Bookmark, Bell, Compass, Flame, LayoutGrid, X, Sparkles, Layers, Sliders } from 'lucide-react';

export default function Header({
  searchQuery,
  setSearchQuery,
  onNavigateHome,
  watchlistCount,
  showWatchlistOnly,
  setShowWatchlistOnly,
  activeCategory,
  setActiveCategory,
  activeLayout,
  setActiveLayout
}) {
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleBellClick = () => {
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };

  return (
    <header className="site-header" id="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <div 
          className="brand-logo" 
          id="brand-logo-btn" 
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigateHome()}
        >
          <div className="logo-icon-wrapper">
            <Play className="logo-icon" fill="currentColor" size={20} />
            <div className="logo-glow"></div>
          </div>
          <div className="logo-text-group">
            <span className="logo-title">CINE<span className="logo-highlight">PULSE</span></span>
            <span className="logo-badge">PRO</span>
          </div>
        </div>

        {/* 3 Layout Switcher Pills in Header */}
        <div className="header-layout-toggle-wrapper">
          <button
            type="button"
            className={`layout-pill-btn ${activeLayout === 'layout1' ? 'active-pill' : ''}`}
            onClick={() => setActiveLayout('layout1')}
            title="Layout 1: Explorer Grid"
            id="layout-1-toggle-btn"
          >
            <LayoutGrid size={14} />
            <span>Layout 1</span>
          </button>
          
          <button
            type="button"
            className={`layout-pill-btn ${activeLayout === 'layout2' ? 'active-pill' : ''}`}
            onClick={() => setActiveLayout('layout2')}
            title="Layout 2: 3D Stage & Bento"
            id="layout-2-toggle-btn"
          >
            <Sparkles size={14} />
            <span>Layout 2</span>
          </button>

          <button
            type="button"
            className={`layout-pill-btn ${activeLayout === 'layout3' ? 'active-pill' : ''}`}
            onClick={() => setActiveLayout('layout3')}
            title="Layout 3: CineStudio & Masonry Stream"
            id="layout-3-toggle-btn"
          >
            <Sliders size={14} />
            <span>Layout 3</span>
            <span className="new-badge-dot">NEW</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <div className="search-input-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              id="global-video-search"
              placeholder="Search 4K videos, creators, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={handleClearSearch}
                aria-label="Clear search input"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="header-actions">
          <button 
            type="button"
            className={`nav-action-btn ${!showWatchlistOnly && activeCategory === 'All' && !searchQuery ? 'active' : ''}`}
            onClick={() => {
              setShowWatchlistOnly(false);
              setActiveCategory('All');
              setSearchQuery('');
              onNavigateHome();
            }}
            id="nav-explore-btn"
          >
            <Compass size={17} />
            <span>Explore</span>
          </button>

          <button 
            type="button"
            className={`nav-action-btn ${activeCategory === 'Sci-Fi & Cinema' ? 'active' : ''}`}
            onClick={() => {
              setShowWatchlistOnly(false);
              setActiveCategory('Sci-Fi & Cinema');
              onNavigateHome();
            }}
            id="nav-trending-btn"
          >
            <Flame size={17} />
            <span>Trending</span>
          </button>

          {/* Watchlist Toggle */}
          <button 
            type="button"
            className={`watchlist-toggle-btn ${showWatchlistOnly ? 'active' : ''}`}
            onClick={() => {
              setShowWatchlistOnly(!showWatchlistOnly);
              onNavigateHome();
            }}
            id="nav-watchlist-btn"
            title="View Saved Videos"
          >
            <Bookmark size={17} fill={showWatchlistOnly ? 'currentColor' : 'none'} />
            <span>Watchlist</span>
            {watchlistCount > 0 && (
              <span className="badge-count" id="watchlist-badge-count">{watchlistCount}</span>
            )}
          </button>

          {/* Notification Bell */}
          <div className="notification-wrapper">
            <button 
              type="button" 
              className="icon-action-btn" 
              onClick={handleBellClick}
              id="notification-bell-btn"
              aria-label="View notifications"
            >
              <Bell size={18} />
              <span className="notification-dot"></span>
            </button>
            {showNotificationToast && (
              <div className="notification-popup">
                <p className="notif-title">🎉 New 4K Releases Added</p>
                <p className="notif-desc">3 new cinematic shorts are available to stream today!</p>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="user-profile-badge" id="user-profile-btn" title="Swapnil (Premium Creator)">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="User Avatar" 
              className="user-avatar"
            />
            <span className="online-indicator"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
