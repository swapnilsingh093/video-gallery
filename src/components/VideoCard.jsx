import React from 'react';
import { Play, Bookmark, CheckCircle2, Eye, Calendar, Sparkles } from 'lucide-react';

export default function VideoCard({ 
  video, 
  onSelectVideo, 
  isWatchlisted, 
  onToggleWatchlist 
}) {
  const getProviderBadge = (type) => {
    switch (type) {
      case 'mp4':
        return <span className="provider-tag mp4-tag">Direct 4K MP4</span>;
      case 'youtube':
        return <span className="provider-tag yt-tag">YouTube 4K</span>;
      case 'vimeo':
        return <span className="provider-tag vimeo-tag">Vimeo Cinema</span>;
      default:
        return null;
    }
  };

  return (
    <article 
      className="video-card" 
      id={`video-card-${video.id}`}
      tabIndex={0}
      role="button"
      onClick={() => onSelectVideo(video)}
      onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(video)}
      aria-label={`Watch ${video.title}`}
    >
      {/* Thumbnail Container */}
      <div className="card-thumb-wrapper">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          loading="lazy"
          className="card-thumb-img"
        />
        
        {/* Hover overlay with glowing play icon */}
        <div className="card-hover-overlay">
          <div className="play-circle-btn">
            <Play fill="#ffffff" size={24} className="play-icon-glow" />
          </div>
          <span className="watch-now-label">Play Now</span>
        </div>

        {/* Top Badges */}
        <div className="card-top-badges">
          {video.badge && (
            <span className="quality-pill">
              <Sparkles size={12} />
              {video.badge}
            </span>
          )}

          <button 
            type="button" 
            className={`card-bookmark-btn ${isWatchlisted ? 'bookmarked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(video.id);
            }}
            id={`bookmark-btn-${video.id}`}
            title={isWatchlisted ? "Remove from Watchlist" : "Save to Watchlist"}
            aria-label={isWatchlisted ? "Remove from Watchlist" : "Save to Watchlist"}
          >
            <Bookmark size={15} fill={isWatchlisted ? '#6366f1' : 'none'} />
          </button>
        </div>

        {/* Bottom Metadata Badges */}
        <div className="card-bottom-badges">
          {getProviderBadge(video.type)}
          <span className="duration-pill">{video.duration}</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="card-info-body">
        {/* Channel Avatar */}
        <div className="channel-avatar-wrapper" title={video.channel.name}>
          <img 
            src={video.channel.avatar} 
            alt={video.channel.name} 
            className="channel-avatar-img"
          />
        </div>

        {/* Title & Metadata */}
        <div className="card-text-details">
          <h3 className="card-video-title" title={video.title}>
            {video.title}
          </h3>

          <div className="card-channel-meta">
            <span className="channel-name">{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle2 size={13} className="verified-icon" />
            )}
          </div>

          <div className="card-stats-row">
            <span className="stat-item">
              <Eye size={13} />
              {video.views}
            </span>
            <span className="dot-divider">•</span>
            <span className="stat-item">
              <Calendar size={13} />
              {video.date}
            </span>
            <span className="dot-divider">•</span>
            <span className="category-tag-mini">{video.category}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
