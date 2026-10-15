import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, ArrowLeft, ThumbsUp, ThumbsDown, Heart, Bookmark, Share2, 
  Download, Flag, CheckCircle2, Star, Eye, Calendar, Clock, 
  MessageSquare, Send, ChevronDown, ChevronUp, Check, Sparkles, 
  Layers, Volume2, ShieldCheck, Layout
} from 'lucide-react';

export default function VideoDetailsLayoutTwo({
  video,
  allVideos,
  onSelectVideo,
  onBackToGallery,
  isWatchlisted,
  onToggleWatchlist,
  onSwitchToDetailsLayout1
}) {
  const [likesCount, setLikesCount] = useState(parseInt(video.likes) || 214);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showFlagToast, setShowFlagToast] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [commentSort, setCommentSort] = useState('top');
  const [newCommentText, setNewCommentText] = useState('');

  // Tube-style comments state
  const [commentsList, setCommentsList] = useState(video.comments || [
    {
      id: "c1",
      user: "Dominic Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      time: "2 hours ago",
      text: "The lighting and atmospheric depth in this 4K render is completely insane! Pure reference-grade digital cinema.",
      likes: 420
    },
    {
      id: "c2",
      user: "Clara Oswald",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      time: "5 hours ago",
      text: "The pacing in the middle act completely drew me in. The open-source rendering has surpassed expectations.",
      likes: 184
    }
  ]);

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasLiked(false);
    setHasDisliked(false);
    setIsDescExpanded(false);
    if (video.comments && video.comments.length > 0) {
      setCommentsList(video.comments);
    }
  }, [video.id]);

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      if (hasDisliked) setHasDisliked(false);
      setLikesCount(prev => prev + 1);
    } else {
      setHasLiked(false);
      setLikesCount(prev => prev - 1);
    }
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      setHasDisliked(true);
      if (hasLiked) {
        setHasLiked(false);
        setLikesCount(prev => prev - 1);
      }
    } else {
      setHasDisliked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const handleFlag = () => {
    setShowFlagToast(true);
    setTimeout(() => setShowFlagToast(false), 3000);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      const newComment = {
        id: `c-${Date.now()}`,
        user: "Swapnil (Viewer)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        time: "Just now",
        text: newCommentText.trim(),
        likes: 1
      };
      setCommentsList([newComment, ...commentsList]);
      setNewCommentText('');
    }
  };

  const relatedVideos = allVideos
    .filter(v => v.id !== video.id)
    .slice(0, 10);

  return (
    <div className="faphouse-details-container" id="faphouse-video-details">
      {/* =====================================================================
          1. TOP NAVIGATION & BREADCRUMB BAR
          ===================================================================== */}
      <div className="faphouse-top-nav">
        <div className="faphouse-nav-left">
          <button 
            type="button" 
            className="faphouse-back-btn" 
            onClick={onBackToGallery}
            id="faphouse-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Back to Videos</span>
          </button>

          <nav className="faphouse-breadcrumbs" aria-label="Breadcrumb">
            <span className="crumb-root" onClick={onBackToGallery}>Videos</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-cat">{video.category}</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{video.title}</span>
          </nav>
        </div>

        <div className="faphouse-nav-right">
          <span className="faphouse-quality-badge">4K ULTRA HD • 60 FPS</span>
          {onSwitchToDetailsLayout1 && (
            <button
              type="button"
              className="faphouse-layout-btn"
              onClick={onSwitchToDetailsLayout1}
              title="Switch to Classic Cinema Layout"
            >
              <Layout size={14} />
              <span>Cinema Mode</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          2. FAPHOUSE 2-COLUMN ASYMMETRICAL STREAMING GRID
          ===================================================================== */}
      <div className="faphouse-main-grid">
        {/* ===================================================================
            LEFT COLUMN (PRIMARY): Video Player, Toolbar, Creator & Comments
            =================================================================== */}
        <div className="faphouse-primary-col">
          {/* Main 16:9 Video Player Deck */}
          <div className="faphouse-player-frame">
            <div className="player-aspect-wrapper">
              {video.type === 'mp4' ? (
                <video
                  ref={videoRef}
                  key={video.id}
                  src={video.url}
                  controls
                  autoPlay
                  playsInline
                  poster={video.thumbnail}
                  className="faphouse-native-player"
                  id="faphouse-video-element"
                />
              ) : (
                <iframe
                  key={video.id}
                  src={`${video.url}?autoplay=1&rel=0`}
                  title={video.title}
                  className="faphouse-iframe-player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Video Overlays */}
            <div className="player-corner-watermark">
              <span className="wm-pro">4K</span>
              <span className="wm-tag">PRO STREAM</span>
            </div>
          </div>

          {/* Video Title & Metrics Section */}
          <div className="faphouse-title-card">
            <h1 className="faphouse-video-title">{video.title}</h1>

            <div className="faphouse-metrics-strip">
              <div className="metrics-left-cluster">
                <span className="metric-pill views-pill">
                  <Eye size={14} />
                  <span>{video.views} Views</span>
                </span>
                <span className="metric-pill rating-pill">
                  <Star size={13} fill="#fbbf24" color="#fbbf24" />
                  <span>98.6%</span>
                </span>
                <span className="metric-pill duration-pill">
                  <Clock size={13} />
                  <span>{video.duration}</span>
                </span>
                <span className="metric-pill date-pill">
                  <Calendar size={13} />
                  <span>{video.date}</span>
                </span>
              </div>

              <div className="metrics-right-cluster">
                <span className="format-tag">{video.badge}</span>
                <span className="format-tag dolby">DOLBY 5.1</span>
              </div>
            </div>

            {/* Faphouse-Style Interactive Action Toolbar */}
            <div className="faphouse-actions-toolbar">
              {/* Like Button */}
              <button
                type="button"
                className={`fap-action-btn like-btn ${hasLiked ? 'active' : ''}`}
                onClick={handleLike}
                title="I like this video"
              >
                <ThumbsUp size={16} fill={hasLiked ? 'currentColor' : 'none'} />
                <span>{likesCount}K</span>
                <span className="rating-pct">(98%)</span>
              </button>

              {/* Dislike Button */}
              <button
                type="button"
                className={`fap-action-btn dislike-btn ${hasDisliked ? 'active' : ''}`}
                onClick={handleDislike}
                title="I dislike this"
              >
                <ThumbsDown size={16} fill={hasDisliked ? 'currentColor' : 'none'} />
                <span>3.2K</span>
              </button>

              {/* Favorite / Watchlist Button */}
              <button
                type="button"
                className={`fap-action-btn favorite-btn ${isWatchlisted ? 'active' : ''}`}
                onClick={() => onToggleWatchlist(video.id)}
                title="Add to Favorites"
              >
                <Heart size={16} fill={isWatchlisted ? '#f43f5e' : 'none'} color={isWatchlisted ? '#f43f5e' : 'currentColor'} />
                <span>{isWatchlisted ? 'Favorited' : 'Favorite'}</span>
              </button>

              {/* Download Master Button */}
              {video.type === 'mp4' ? (
                <a
                  href={video.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="fap-action-btn download-btn"
                  title="Download in 4K"
                >
                  <Download size={16} />
                  <span>Download</span>
                  <span className="dl-badge">4K</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="fap-action-btn download-btn"
                  onClick={handleShare}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              )}

              {/* Share Button */}
              <button
                type="button"
                className="fap-action-btn share-btn"
                onClick={handleShare}
                title="Share video link"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>

              {/* Report Button */}
              <button
                type="button"
                className="fap-action-btn flag-btn"
                onClick={handleFlag}
                title="Report Video"
              >
                <Flag size={15} />
                <span>Report</span>
              </button>
            </div>

            {/* Notification Toasts */}
            {showShareToast && (
              <div className="fap-toast-alert success">
                <Check size={15} />
                <span>Video stream URL copied to clipboard!</span>
              </div>
            )}

            {showFlagToast && (
              <div className="fap-toast-alert info">
                <ShieldCheck size={15} />
                <span>Report received. Our moderation team will review this screening.</span>
              </div>
            )}
          </div>

          {/* Performer / Studio Profile Block */}
          <div className="faphouse-creator-card">
            <div className="creator-profile-info">
              <img 
                src={video.channel.avatar} 
                alt={video.channel.name} 
                className="fap-creator-avatar" 
              />
              <div className="creator-details-box">
                <div className="creator-title-row">
                  <h3 className="creator-name">{video.channel.name}</h3>
                  {video.channel.verified && (
                    <CheckCircle2 size={16} className="creator-verified-icon" />
                  )}
                  <span className="verified-pill">VERIFIED CREATOR</span>
                </div>
                <div className="creator-stats-line">
                  <span>{video.channel.subscribers} Subscribers</span>
                  <span className="dot">•</span>
                  <span>48 Releases</span>
                  <span className="dot">•</span>
                  <span className="rank-text">Top 1% Creator</span>
                </div>
              </div>
            </div>

            <div className="creator-cta-buttons">
              <button
                type="button"
                className={`fap-subscribe-btn ${isSubscribed ? 'is-subscribed' : ''}`}
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                {isSubscribed ? <Check size={15} /> : <Sparkles size={15} />}
                <span>{isSubscribed ? 'Subscribed' : '+ Follow Studio'}</span>
              </button>

              <button
                type="button"
                className="fap-vip-btn"
                onClick={handleShare}
              >
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span>Join VIP</span>
              </button>
            </div>
          </div>

          {/* Clickable Tags & Categories Bar */}
          <div className="faphouse-tags-wrapper">
            <div className="tags-title">Tags & Niches:</div>
            <div className="tags-pill-row">
              <span className="fap-tag-pill highlight">#{video.category}</span>
              <span className="fap-tag-pill">#4K Ultra HD</span>
              <span className="fap-tag-pill">#High Definition</span>
              {(video.tags || ["CGI", "SciFi", "Blender", "StudioMaster", "60FPS"]).map((tag, idx) => (
                <span key={idx} className="fap-tag-pill">#{tag}</span>
              ))}
              <span className="fap-tag-pill">#Dolby Atmos</span>
              <span className="fap-tag-pill">#Exclusive</span>
            </div>
          </div>

          {/* Expandable Video Description */}
          <div className="faphouse-desc-card">
            <h4 className="desc-section-title">Video Description & Production Credits</h4>
            <div className={`desc-content ${isDescExpanded ? 'expanded' : 'clamped'}`}>
              <p>{video.description}</p>
              {isDescExpanded && (
                <div className="desc-extra-info">
                  <p>
                    Produced and rendered using open-source visual pipeline tools in DCI-P3 wide color space. 
                    Includes uncompressed spatial sound design, stereoscopic depth maps, and dynamic lighting rendering.
                  </p>
                  <div className="desc-meta-table">
                    <div className="meta-cell"><span>Resolution:</span> 3840 x 2160 (4K UHD)</div>
                    <div className="meta-cell"><span>Aspect Ratio:</span> 16:9 Standard Wide</div>
                    <div className="meta-cell"><span>Encoding:</span> H.264 / AAC 320kbps</div>
                    <div className="meta-cell"><span>Content Rating:</span> All Audiences</div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="desc-expand-btn"
              onClick={() => setIsDescExpanded(!isDescExpanded)}
            >
              <span>{isDescExpanded ? 'Show Less' : 'Show Full Description'}</span>
              {isDescExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {/* Tube-Style Community Comments */}
          <div className="faphouse-comments-card">
            <div className="comments-header-bar">
              <div className="comments-count-title">
                <MessageSquare size={18} className="comment-icon" />
                <h3>{commentsList.length} Comments</h3>
              </div>

              <div className="comments-sort-pills">
                <button
                  type="button"
                  className={`sort-pill ${commentSort === 'top' ? 'active' : ''}`}
                  onClick={() => setCommentSort('top')}
                >
                  Top Comments
                </button>
                <button
                  type="button"
                  className={`sort-pill ${commentSort === 'newest' ? 'active' : ''}`}
                  onClick={() => setCommentSort('newest')}
                >
                  Newest
                </button>
              </div>
            </div>

            {/* Comment Composer */}
            <form className="fap-comment-form" onSubmit={handleAddComment}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Your Avatar"
                className="fap-user-avatar"
              />
              <div className="comment-input-cluster">
                <textarea
                  placeholder="Add a public comment or review this release..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="fap-comment-textarea"
                  rows={2}
                />
                <div className="comment-form-actions">
                  <span className="comment-guideline">Be respectful to creators and members</span>
                  <button
                    type="submit"
                    className="fap-post-comment-btn"
                    disabled={!newCommentText.trim()}
                  >
                    <Send size={14} />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comments Feed */}
            <div className="fap-comments-feed">
              {commentsList.map((comm) => (
                <div key={comm.id} className="fap-comment-item">
                  <img src={comm.avatar} alt={comm.user} className="comment-author-avatar" />
                  <div className="comment-item-body">
                    <div className="comment-item-top">
                      <span className="comment-author-name">{comm.user}</span>
                      <span className="comment-time-stamp">• {comm.time}</span>
                    </div>
                    <p className="comment-item-text">{comm.text}</p>
                    <div className="comment-item-actions">
                      <button type="button" className="comment-action-link">
                        <ThumbsUp size={12} />
                        <span>{comm.likes || 12}</span>
                      </button>
                      <button type="button" className="comment-action-link">
                        <ThumbsDown size={12} />
                      </button>
                      <button type="button" className="comment-action-link reply-link">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN (SECONDARY): Faphouse Related / Up Next Sidebar
            =================================================================== */}
        <aside className="faphouse-sidebar-col">
          {/* Sidebar Header with Autoplay Toggle */}
          <div className="faphouse-sidebar-header">
            <h3 className="sidebar-section-heading">Up Next & Related Videos</h3>
            <div className="autoplay-toggle-wrapper">
              <span className="autoplay-label">Autoplay</span>
              <button
                type="button"
                className={`autoplay-switch ${autoplayNext ? 'on' : 'off'}`}
                onClick={() => setAutoplayNext(!autoplayNext)}
                aria-label="Toggle Autoplay"
              >
                <span className="switch-handle"></span>
              </button>
            </div>
          </div>

          {/* Continuous Vertical Stack of Horizontal Cards */}
          <div className="faphouse-related-list">
            {relatedVideos.map((item) => (
              <article
                key={item.id}
                className="fap-related-card"
                onClick={() => onSelectVideo(item)}
              >
                {/* Thumbnail Frame */}
                <div className="fap-card-thumb-frame">
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  <span className="fap-thumb-duration">{item.duration}</span>
                  <span className="fap-thumb-quality">{item.badge || 'HD'}</span>

                  <div className="fap-thumb-hover-overlay">
                    <div className="fap-mini-play-bubble">
                      <Play fill="#fff" size={15} />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="fap-card-info">
                  <h4 className="fap-card-title">{item.title}</h4>
                  <div className="fap-card-author">
                    <span>{item.channel.name}</span>
                    {item.channel.verified && (
                      <CheckCircle2 size={12} className="card-verified-mini" />
                    )}
                  </div>
                  <div className="fap-card-stats-line">
                    <span>{item.views} views</span>
                    <span className="dot">•</span>
                    <span className="fap-pct-rating">98% ★</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
