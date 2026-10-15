import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GalleryLayoutTwo from './pages/GalleryLayoutTwo';
import VideoDetailsPage from './pages/VideoDetailsPage';
import VideoDetailsLayoutTwo from './pages/VideoDetailsLayoutTwo';
import { VIDEOS_DATA } from './data/videos';

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  
  // Single Video Details Layout: 'details1' (Cinema) | 'details2' (Faphouse Tube)
  const [detailsLayout, setDetailsLayout] = useState('details2'); // Default to Faphouse Tube Layout

  // Initialize watchlist from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cinepulse_watchlist');
      return saved ? JSON.parse(saved) : ['v-1', 'v-3', 'v-5'];
    } catch {
      return ['v-1', 'v-3', 'v-5'];
    }
  });

  // Save watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cinepulse_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  // Toggle video in watchlist
  const handleToggleWatchlist = (videoId) => {
    setWatchlist(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId) 
        : [...prev, videoId]
    );
  };

  // Select video to open details page
  const handleSelectVideo = (video) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to gallery
  const handleBackToGallery = () => {
    setCurrentVideo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle footer category click
  const handleFooterCategoryClick = (category) => {
    setActiveCategory(category);
    setShowWatchlistOnly(false);
    setCurrentVideo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout" id="app-root">
      {/* Universal Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateHome={handleBackToGallery}
        watchlistCount={watchlist.length}
        showWatchlistOnly={showWatchlistOnly}
        setShowWatchlistOnly={setShowWatchlistOnly}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Floating Single Video Layout Switcher (visible when viewing single video) */}
      {currentVideo && (
        <div className="floating-details-switcher" id="details-layout-switcher">
          <span className="switcher-hint">Details Style:</span>
          <button
            type="button"
            className={`details-switch-btn ${detailsLayout === 'details2' ? 'active' : ''}`}
            onClick={() => setDetailsLayout('details2')}
          >
            Details Layout 2 (Faphouse Tube)
            <span className="dot-new">NEW</span>
          </button>
          <button
            type="button"
            className={`details-switch-btn ${detailsLayout === 'details1' ? 'active' : ''}`}
            onClick={() => setDetailsLayout('details1')}
          >
            Details Layout 1 (Classic Cinema)
          </button>
        </div>
      )}

      {/* Main Page Render: ONLY Layout 2 (Zigzag Bento) for Gallery, or Selected Single Video Details */}
      <main className="main-content-flow" id="main-content-flow">
        {currentVideo ? (
          detailsLayout === 'details2' ? (
            <VideoDetailsLayoutTwo
              video={currentVideo}
              allVideos={VIDEOS_DATA}
              onSelectVideo={handleSelectVideo}
              onBackToGallery={handleBackToGallery}
              isWatchlisted={watchlist.includes(currentVideo.id)}
              onToggleWatchlist={handleToggleWatchlist}
              onSwitchToDetailsLayout1={() => setDetailsLayout('details1')}
            />
          ) : (
            <VideoDetailsPage
              video={currentVideo}
              allVideos={VIDEOS_DATA}
              onSelectVideo={handleSelectVideo}
              onBackToGallery={handleBackToGallery}
              isWatchlisted={watchlist.includes(currentVideo.id)}
              onToggleWatchlist={handleToggleWatchlist}
            />
          )
        ) : (
          <GalleryLayoutTwo
            videos={VIDEOS_DATA}
            onSelectVideo={handleSelectVideo}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showWatchlistOnly={showWatchlistOnly}
            setShowWatchlistOnly={setShowWatchlistOnly}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onCategoryClick={handleFooterCategoryClick} />
    </div>
  );
}
