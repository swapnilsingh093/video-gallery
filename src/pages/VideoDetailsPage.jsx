import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ThumbsUp, ThumbsDown, Share2, Bookmark, CheckCircle2, 
  Maximize2, Minimize2, Download, Eye, Calendar, Sparkles, MessageSquare, 
  Send, Clock, Play, Check, Flame, Radio
} from 'lucide-react';

export default function VideoDetailsPage({
  video,
  allVideos,
  onSelectVideo,
  onBackToGallery,
  isWatchlisted,
  onToggleWatchlist
}) {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [likesCount, setLikesCount] = useState(parseInt(video.likes) || 214);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState(null);
  
  // Comments state
  const [comments, setComments] = useState(video.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentLikes, setCommentLikes] = useState({});

  const videoPlayerRef = useRef(null);

  // Scroll to top when video changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setComments(video.comments || []);
    setHasLiked(false);
    setHasDisliked(false);
    setActiveTimestamp(null);
  }, [video.id]);

  // Handle Like
  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setHasDisliked(false);
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

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      const newComment = {
        id: `c-${Date.now()}`,
        user: "Swapnil (You)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        time: "Just now",
        text: newCommentText.trim(),
        likes: 1
      };
      setComments([newComment, ...comments]);
      setNewCommentText('');
    }
  };

  const handleCommentLike = (commentId) => {
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }));
  };

  // Filter related videos (excluding current)
  const relatedVideos = allVideos
    .filter(v => v.id !== video.id)
    .slice(0, 8);

  return (
    <div className={`video-details-page ${isTheaterMode ? 'theater-layout' : 'standard-layout'}`} id="video-details-page">
      {/* Top Floating Navigation Bar */}
      <div className="details-top-nav">
        <button 
          type="button" 
          className="back-to-gallery-btn" 
          onClick={onBackToGallery}
          id="back-to-gallery-btn"
        >
          <ArrowLeft size={18} />
          <span>Back to Explore</span>
        </button>

        <div className="breadcrumbs-tag">
          <span className="b-cat">{video.category}</span>
          <span className="b-sep">/</span>
          <span className="b-title">{video.title}</span>
        </div>

        <button 
          type="button"
          className="theater-toggle-btn top-theater-btn"
          onClick={() => setIsTheaterMode(!isTheaterMode)}
          title={isTheaterMode ? "Exit Theater Mode" : "Expand Theater Mode"}
          id="theater-mode-btn"
        >
          {isTheaterMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          <span>{isTheaterMode ? "Default View" : "Theater Mode"}</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="details-content-grid">
        {/* Left Column: Player + Metadata + Comments */}
        <div className="details-primary-column">
          {/* Ambient Lighting & Player Wrapper */}
          <div className="cinema-player-wrapper" id="cinema-player-wrapper">
            <div className="player-ambient-glow" style={{ backgroundImage: `url(${video.thumbnail})` }}></div>
            
            <div className="video-viewport-frame">
              {video.type === 'mp4' ? (
                <video
                  ref={videoPlayerRef}
                  key={video.id}
                  src={video.url}
                  controls
                  autoPlay
                  playsInline
                  poster={video.thumbnail}
                  className="native-html5-player"
                  id="html5-video-player"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              ) : (
                <iframe
                  key={video.id}
                  src={`${video.url}?autoplay=1&rel=0`}
                  title={video.title}
                  className="embedded-iframe-player"
                  id="embedded-video-player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>

          {/* Video Title & Meta Bar */}
          <div className="video-meta-section">
            <div className="video-tags-row">
              {video.badge && <span className="meta-badge-pill">{video.badge}</span>}
              <span className="meta-category-pill">{video.category}</span>
              <span className="meta-duration-pill">{video.duration}</span>
            </div>

            <h1 className="details-video-title" id="details-video-title">
              {video.title}
            </h1>

            {/* Stats and Action Bar */}
            <div className="action-stats-bar">
              <div className="views-date-stats">
                <span className="stat-pill"><Eye size={14} /> {video.views} views</span>
                <span className="dot-sep">•</span>
                <span className="stat-pill"><Calendar size={14} /> Premiered {video.date}</span>
              </div>

              {/* Action Buttons */}
              <div className="interactive-actions-group">
                <div className="like-dislike-pill">
                  <button 
                    type="button" 
                    className={`action-pill-btn ${hasLiked ? 'active-like' : ''}`}
                    onClick={handleLike}
                    id="like-video-btn"
                    title="I like this"
                  >
                    <ThumbsUp size={16} fill={hasLiked ? 'currentColor' : 'none'} />
                    <span>{likesCount}K</span>
                  </button>
                  <span className="btn-divider"></span>
                  <button 
                    type="button" 
                    className={`action-pill-btn ${hasDisliked ? 'active-dislike' : ''}`}
                    onClick={handleDislike}
                    id="dislike-video-btn"
                    title="Dislike"
                  >
                    <ThumbsDown size={16} fill={hasDisliked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button 
                  type="button" 
                  className="action-pill-btn share-btn"
                  onClick={handleShare}
                  id="share-video-btn"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>

                <button 
                  type="button" 
                  className={`action-pill-btn save-btn ${isWatchlisted ? 'active-save' : ''}`}
                  onClick={() => onToggleWatchlist(video.id)}
                  id="details-save-watchlist-btn"
                >
                  <Bookmark size={16} fill={isWatchlisted ? 'currentColor' : 'none'} />
                  <span>{isWatchlisted ? 'Saved' : 'Watchlist'}</span>
                </button>

                {video.type === 'mp4' && (
                  <a 
                    href={video.url} 
                    download 
                    target="_blank" 
                    rel="noreferrer"
                    className="action-pill-btn download-btn"
                    id="download-video-btn"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </a>
                )}
              </div>
            </div>

            {/* Share Toast Notification */}
            {showShareToast && (
              <div className="share-toast-banner" id="share-toast-alert">
                <Check size={16} />
                <span>Video stream link copied to your clipboard!</span>
              </div>
            )}
          </div>

          {/* Channel Card */}
          <div className="creator-profile-card">
            <div className="creator-left-info">
              <img src={video.channel.avatar} alt={video.channel.name} className="creator-big-avatar" />
              <div>
                <div className="creator-name-row">
                  <h3 className="creator-title">{video.channel.name}</h3>
                  {video.channel.verified && <CheckCircle2 size={15} className="verified-icon" />}
                </div>
                <span className="creator-subs">{video.channel.subscribers} subscribers</span>
              </div>
            </div>

            <button 
              type="button" 
              className={`subscribe-toggle-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={() => setIsSubscribed(!isSubscribed)}
              id="subscribe-channel-btn"
            >
              {isSubscribed ? (
                <>
                  <Check size={16} />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <Flame size={16} />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>

          {/* Expandable Description & Timestamps */}
          <div className="synopsis-box">
            <div className="synopsis-header">
              <h4>Overview & Synopsis</h4>
            </div>
            <p className="synopsis-paragraph">{video.description}</p>

            {/* Chapters / Timestamps */}
            {video.timestamps && video.timestamps.length > 0 && (
              <div className="chapters-container">
                <h5 className="chapters-heading"><Clock size={15} /> Video Chapters & Timestamps</h5>
                <div className="chapters-grid">
                  {video.timestamps.map((ts, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`chapter-badge-btn ${activeTimestamp === ts.time ? 'active-chapter' : ''}`}
                      onClick={() => setActiveTimestamp(ts.time)}
                      title={`Jump to ${ts.time}`}
                    >
                      <span className="chapter-timestamp">{ts.time}</span>
                      <span className="chapter-label">{ts.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Row */}
            <div className="video-tags-footer">
              {video.tags.map(tag => (
                <span key={tag} className="footer-tag-pill">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="comments-section" id="comments-section">
            <div className="comments-header">
              <div className="comments-count-title">
                <MessageSquare size={20} />
                <h3>{comments.length} Discussion Comments</h3>
              </div>
            </div>

            {/* Add Comment Input Form */}
            <form className="add-comment-form" onSubmit={handleAddComment}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Your Avatar" 
                className="comment-my-avatar"
              />
              <div className="comment-input-wrapper">
                <textarea
                  placeholder="Add a public comment or film critique..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="comment-textarea"
                  rows={2}
                  id="new-comment-textarea"
                />
                <div className="comment-submit-row">
                  <button 
                    type="submit" 
                    className="post-comment-btn" 
                    disabled={!newCommentText.trim()}
                    id="submit-comment-btn"
                  >
                    <Send size={14} />
                    <span>Post Comment</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="comments-list">
              {comments.map((comm) => (
                <div className="single-comment-card" key={comm.id}>
                  <img src={comm.avatar} alt={comm.user} className="comment-author-avatar" />
                  <div className="comment-content-area">
                    <div className="comment-meta-bar">
                      <span className="author-name">{comm.user}</span>
                      <span className="comment-timestamp">{comm.time}</span>
                    </div>
                    <p className="comment-text-body">{comm.text}</p>
                    <div className="comment-interaction-bar">
                      <button 
                        type="button" 
                        className="comment-like-btn"
                        onClick={() => handleCommentLike(comm.id)}
                      >
                        <ThumbsUp size={13} />
                        <span>{(comm.likes || 0) + (commentLikes[comm.id] || 0)}</span>
                      </button>
                      <button type="button" className="comment-reply-btn">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Up Next / Related Queue */}
        <aside className="details-sidebar-column" id="details-sidebar">
          <div className="sidebar-sticky-box">
            <div className="sidebar-header">
              <div className="queue-title-row">
                <Radio size={18} className="live-pulse-icon" />
                <h3>Up Next & Related</h3>
              </div>
              <span className="queue-count-badge">{relatedVideos.length} Queued</span>
            </div>

            <div className="sidebar-video-list">
              {relatedVideos.map((item) => (
                <div 
                  key={item.id}
                  className="sidebar-video-item"
                  onClick={() => onSelectVideo(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectVideo(item)}
                  id={`sidebar-item-${item.id}`}
                >
                  <div className="sidebar-thumb-frame">
                    <img src={item.thumbnail} alt={item.title} className="sidebar-thumb-img" />
                    <span className="sidebar-duration">{item.duration}</span>
                    <div className="sidebar-play-hover">
                      <Play fill="#fff" size={16} />
                    </div>
                  </div>

                  <div className="sidebar-item-info">
                    <h4 className="sidebar-item-title" title={item.title}>
                      {item.title}
                    </h4>
                    <span className="sidebar-item-channel">{item.channel.name}</span>
                    <div className="sidebar-item-stats">
                      <span>{item.views}</span>
                      <span className="dot">•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
