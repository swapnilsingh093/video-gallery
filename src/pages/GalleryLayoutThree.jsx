import React, { useState } from 'react';
import { 
  Play, Bookmark, Sparkles, Flame, Eye, Calendar, Volume2, 
  VolumeX, Star, Zap, Radio, Sliders, ExternalLink, ArrowUpRight, Maximize2
} from 'lucide-react';

export default function GalleryLayoutThree({
  videos,
  onSelectVideo,
  watchlist,
  onToggleWatchlist
}) {
  // Left Master Reel spotlight video (user can change by clicking any card)
  const [masterVideo, setMasterVideo] = useState(videos[0]);
  const [activeTab, setActiveTab] = useState('All');
  const [isMuted, setIsMuted] = useState(true);

  const categories = ["All", "Sci-Fi & Cinema", "Animation", "Nature & Space", "Tech & Future", "Music & Lofi"];

  const filteredStream = activeTab === 'All' 
    ? videos 
    : videos.filter(v => v.category === activeTab);

  return (
    <div className="layout-three-container" id="gallery-layout-three">
      {/* Header Banner Strip */}
      <div className="layout-three-header-strip">
        <div className="strip-title-group">
          <span className="live-studio-badge">
            <span className="pulse-beacon"></span>
            LIVE STUDIO FEED
          </span>
          <h1 className="strip-main-title">CineStudio Master Stream</h1>
          <p className="strip-desc">Split-screen live preview console & editorial masonry feed</p>
        </div>

        {/* Filter Pills in Strip */}
        <div className="strip-filter-pills">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`strip-pill-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Console Grid */}
      <div className="split-console-grid">
        {/* =====================================================================
            LEFT COLUMN: THE MASTER REEL MONITOR (STICKY SPOTLIGHT)
            ===================================================================== */}
        <div className="master-reel-column">
          <div className="master-reel-sticky-box">
            <div className="monitor-frame">
              {/* Screen Top Status Bar */}
              <div className="monitor-top-bar">
                <div className="monitor-signals">
                  <span className="signal-dot red"></span>
                  <span className="signal-dot yellow"></span>
                  <span className="signal-dot green"></span>
                  <span className="signal-code">STREAM 4K // CH-01</span>
                </div>
                <div className="monitor-badge-group">
                  <span className="live-badge"><Radio size={11} /> MONITORING</span>
                  <span className="res-badge">{masterVideo.badge}</span>
                </div>
              </div>

              {/* Video Player / Screen Box */}
              <div className="monitor-screen-wrapper">
                {masterVideo.type === 'mp4' ? (
                  <video
                    key={masterVideo.id}
                    src={masterVideo.url}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    poster={masterVideo.thumbnail}
                    className="monitor-video-feed"
                  />
                ) : (
                  <img 
                    src={masterVideo.thumbnail} 
                    alt={masterVideo.title} 
                    className="monitor-video-feed"
                  />
                )}

                <div className="screen-scanlines"></div>
                
                {/* Audio Equalizer & Sound Toggle */}
                <div className="screen-audio-controls">
                  <div className="sound-visualizer-bars">
                    <span className="eq-bar b1"></span>
                    <span className="eq-bar b2"></span>
                    <span className="eq-bar b3"></span>
                    <span className="eq-bar b4"></span>
                    <span className="eq-bar b5"></span>
                  </div>

                  {masterVideo.type === 'mp4' && (
                    <button 
                      type="button" 
                      className="sound-toggle-btn"
                      onClick={() => setIsMuted(!isMuted)}
                      title={isMuted ? "Unmute preview" : "Mute preview"}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Monitor Info Deck */}
              <div className="monitor-info-deck">
                <div className="deck-tag-row">
                  <span className="deck-cat-tag">{masterVideo.category}</span>
                  <span className="deck-duration-pill">{masterVideo.duration}</span>
                </div>

                <h2 className="deck-video-title">{masterVideo.title}</h2>
                <p className="deck-video-desc">{masterVideo.description}</p>

                {/* Creator bar */}
                <div className="deck-creator-row">
                  <img src={masterVideo.channel.avatar} alt={masterVideo.channel.name} className="deck-avatar" />
                  <div className="deck-channel-info">
                    <span className="deck-name">{masterVideo.channel.name}</span>
                    <span className="deck-subs">{masterVideo.channel.subscribers} Subscribers</span>
                  </div>
                </div>

                {/* Main Action CTAs */}
                <div className="deck-actions-row">
                  <button 
                    type="button" 
                    className="deck-play-now-btn"
                    onClick={() => onSelectVideo(masterVideo)}
                    id="master-reel-play-btn"
                  >
                    <Play fill="#0f172a" size={17} />
                    <span>Watch Full Screening</span>
                  </button>

                  <button 
                    type="button" 
                    className={`deck-bookmark-btn ${watchlist.includes(masterVideo.id) ? 'bookmarked' : ''}`}
                    onClick={() => onToggleWatchlist(masterVideo.id)}
                    title="Bookmark to Watchlist"
                    id="master-reel-bookmark-btn"
                  >
                    <Bookmark size={18} fill={watchlist.includes(masterVideo.id) ? '#6366f1' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT COLUMN: THE MODULAR STREAM MASONRY FEED
            ===================================================================== */}
        <div className="modular-stream-column">
          <div className="stream-header-bar">
            <div className="stream-count-info">
              <span className="stream-highlight-number">{filteredStream.length}</span>
              <span className="stream-label">Curated Master Pieces</span>
            </div>
            <span className="stream-hint-pill">Click card to preview or stream</span>
          </div>

          <div className="masonry-stream-grid">
            {filteredStream.map((video, index) => {
              const isSelectedOnMonitor = masterVideo.id === video.id;
              const isFeaturedSize = index % 5 === 0;

              return (
                <article 
                  key={video.id} 
                  className={`stream-card ${isFeaturedSize ? 'card-featured-span' : ''} ${isSelectedOnMonitor ? 'monitor-active' : ''}`}
                  onClick={() => onSelectVideo(video)}
                >
                  <div className="stream-thumb-frame">
                    <img src={video.thumbnail} alt={video.title} loading="lazy" />
                    <div className="stream-thumb-gradient"></div>

                    {/* Top Pill Badges */}
                    <div className="stream-card-top">
                      <span className="stream-quality-tag">{video.badge}</span>
                      <button 
                        type="button" 
                        className={`stream-quick-preview-btn ${isSelectedOnMonitor ? 'is-active-btn' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMasterVideo(video);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        title="Load into Master Monitor"
                      >
                        <Zap size={13} />
                        <span>{isSelectedOnMonitor ? 'Monitoring' : 'Preview'}</span>
                      </button>
                    </div>

                    {/* Hover Overlay */}
                    <div className="stream-hover-veil">
                      <div className="stream-play-circle">
                        <Play fill="#fff" size={20} />
                      </div>
                      <span className="stream-play-hint">Watch Film</span>
                    </div>

                    {/* Duration Badge */}
                    <span className="stream-duration-badge">{video.duration}</span>
                  </div>

                  {/* Card Content Body */}
                  <div className="stream-card-body">
                    <div className="stream-cat-row">
                      <span className="stream-cat-name">{video.category}</span>
                      <span className="stream-views">{video.views}</span>
                    </div>

                    <h3 className="stream-card-title">{video.title}</h3>

                    {/* Channel line */}
                    <div className="stream-creator-bar">
                      <img src={video.channel.avatar} alt={video.channel.name} className="stream-avatar" />
                      <span className="stream-channel-name">{video.channel.name}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
