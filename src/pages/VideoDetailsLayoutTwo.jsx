import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, ArrowLeft, ThumbsUp, ThumbsDown, Share2, Bookmark, CheckCircle2, 
  Sparkles, Star, Download, Eye, Calendar, Clock, Film, Radio, 
  Send, MessageSquare, Layers, Volume2, ShieldCheck, Check, Layout
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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  // Review & Star rating state
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: "r1",
      author: "Dominic Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rating: 5,
      date: "Yesterday",
      text: "The audio separation in Dolby Atmos and the contrast gradient in the blacks is reference-grade quality. An absolute benchmark for modern digital cinema.",
      likes: 89
    },
    {
      id: "r2",
      author: "Clara Oswald",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      rating: 5,
      date: "3 days ago",
      text: "The pacing in the middle act completely drew me in. Open-source rendering has surpassed expectations.",
      likes: 45
    }
  ]);

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasLiked(false);
  }, [video.id]);

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikesCount(prev => prev + 1);
    } else {
      setHasLiked(false);
      setLikesCount(prev => prev - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  const handlePostReview = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      const newRev = {
        id: `r-${Date.now()}`,
        author: "Swapnil (Audience Critic)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        rating: userRating,
        date: "Just now",
        text: reviewText.trim(),
        likes: 1
      };
      setReviewsList([newRev, ...reviewsList]);
      setReviewText('');
    }
  };

  const relatedVideos = allVideos
    .filter(v => v.id !== video.id)
    .slice(0, 8);

  return (
    <div className="details-layout-two" id="details-layout-two">
      {/* =====================================================================
          1. TOP IMAX PANORAMIC CINEMA SCREEN (FULL BLEED)
          ===================================================================== */}
      <section className="imax-cinema-header" id="imax-player-section">
        {/* Top Floating Control Deck */}
        <div className="imax-floating-control-bar">
          <button 
            type="button" 
            className="imax-back-btn" 
            onClick={onBackToGallery}
            id="imax-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Catalog</span>
          </button>

          <div className="imax-format-status">
            <span className="imax-badge">IMAX 4K PREMIERE</span>
            <span className="imax-dot">•</span>
            <span className="imax-specs">DCI-P3 10-BIT // DOLBY ATMOS</span>
          </div>

          <button 
            type="button" 
            className="imax-switch-layout-btn"
            onClick={onSwitchToDetailsLayout1}
            title="Switch to Details Layout 1"
          >
            <Layout size={15} />
            <span>Switch to Details Layout 1</span>
          </button>
        </div>

        {/* Ambient Halo & Player Container */}
        <div className="imax-player-frame-container">
          <div className="imax-ambient-halo" style={{ backgroundImage: `url(${video.thumbnail})` }}></div>
          
          <div className="imax-viewport-box">
            {video.type === 'mp4' ? (
              <video
                ref={videoRef}
                key={video.id}
                src={video.url}
                controls
                autoPlay
                playsInline
                poster={video.thumbnail}
                className="imax-native-video"
                id="imax-native-video"
              />
            ) : (
              <iframe
                key={video.id}
                src={`${video.url}?autoplay=1&rel=0`}
                title={video.title}
                className="imax-iframe-video"
                id="imax-iframe-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BOTTOM 3-COLUMN STUDIO CONSOLE
          ===================================================================== */}
      <div className="studio-console-container">
        {/* Column 1: Film Tech Specs & Creator Dashboard */}
        <aside className="studio-col-specs">
          {/* Creator Profile Box */}
          <div className="studio-creator-card">
            <img src={video.channel.avatar} alt={video.channel.name} className="studio-creator-img" />
            <div className="studio-creator-meta">
              <div className="studio-name-row">
                <h4>{video.channel.name}</h4>
                {video.channel.verified && <CheckCircle2 size={14} className="verified-blue" />}
              </div>
              <span className="studio-subs-count">{video.channel.subscribers}</span>
            </div>

            <button 
              type="button" 
              className={`studio-subscribe-btn ${isSubscribed ? 'active' : ''}`}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? <Check size={14} /> : <Sparkles size={14} />}
              <span>{isSubscribed ? 'Subscribed' : 'Follow Studio'}</span>
            </button>
          </div>

          {/* Technical Specs Dashboard */}
          <div className="studio-specs-box">
            <h5 className="specs-box-heading"><Film size={14} /> Master Screening Specs</h5>
            <div className="specs-list">
              <div className="spec-row">
                <span className="spec-k">Master Resolution</span>
                <span className="spec-v">3840 x 2160 (4K UHD)</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Aspect Ratio</span>
                <span className="spec-v">2.39:1 Anamorphic</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Sound Mix</span>
                <span className="spec-v">Dolby Atmos 5.1</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Color Space</span>
                <span className="spec-v">DCI-P3 10-Bit HDR</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Platform Stream</span>
                <span className="spec-v highlight">{video.type.toUpperCase()} Direct</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Stack */}
          <div className="studio-actions-stack">
            <button 
              type="button" 
              className={`studio-action-button ${hasLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp size={16} fill={hasLiked ? 'currentColor' : 'none'} />
              <span>{likesCount}K Likes</span>
            </button>

            <button 
              type="button" 
              className={`studio-action-button ${isWatchlisted ? 'saved' : ''}`}
              onClick={() => onToggleWatchlist(video.id)}
            >
              <Bookmark size={16} fill={isWatchlisted ? 'currentColor' : 'none'} />
              <span>{isWatchlisted ? 'In Watchlist' : 'Save to Watchlist'}</span>
            </button>

            <button 
              type="button" 
              className="studio-action-button"
              onClick={handleShare}
            >
              <Share2 size={16} />
              <span>Share Premiere</span>
            </button>

            {video.type === 'mp4' && (
              <a 
                href={video.url} 
                download 
                target="_blank" 
                rel="noreferrer"
                className="studio-action-button download-act"
              >
                <Download size={16} />
                <span>Download Master</span>
              </a>
            )}
          </div>

          {showShareToast && (
            <div className="share-toast-banner mini">
              <Check size={14} />
              <span>Direct Link Copied!</span>
            </div>
          )}
        </aside>

        {/* Column 2: Storyboard Timeline & Audience Reviews (Center) */}
        <main className="studio-col-center">
          {/* Header Title */}
          <div className="center-header-box">
            <div className="center-tags-row">
              <span className="center-category-badge">{video.category}</span>
              <span className="center-release-badge">{video.badge}</span>
              <span className="center-views-badge"><Eye size={13} /> {video.views}</span>
            </div>

            <h1 className="center-video-title">{video.title}</h1>
            <p className="center-synopsis-text">{video.description}</p>
          </div>

          {/* Interactive Scene Storyboard (New in Layout 2) */}
          <section className="storyboard-section">
            <div className="storyboard-header">
              <div className="story-title-row">
                <Clock size={16} className="text-cyan" />
                <h4>Interactive Scene Storyboard</h4>
              </div>
              <span className="story-count">Select Scene Cue</span>
            </div>

            <div className="storyboard-cards-scroll">
              {(video.timestamps || [
                { time: "0:00", title: "Act I: Opening" },
                { time: "3:20", title: "Act II: Conflict" },
                { time: "7:45", title: "Act III: Climax" }
              ]).map((scene, idx) => (
                <div 
                  key={idx}
                  className={`storyboard-cue-card ${activeChapterIdx === idx ? 'active-cue' : ''}`}
                  onClick={() => setActiveChapterIdx(idx)}
                >
                  <div className="cue-thumb-box">
                    <img src={video.thumbnail} alt={scene.title} />
                    <span className="cue-time">{scene.time}</span>
                  </div>
                  <div className="cue-info">
                    <span className="cue-label">SCENE 0{idx + 1}</span>
                    <h5 className="cue-title">{scene.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Audience Review & Critique Section (5-Star Rating) */}
          <section className="critique-reviews-section">
            <div className="critique-header">
              <div className="critique-title-group">
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <h3>Audience Reviews & Critiques</h3>
              </div>
              <span className="critique-score-badge">4.9 / 5.0 (Verified)</span>
            </div>

            {/* Post Review Form with Star Picker */}
            <form className="write-critique-form" onSubmit={handlePostReview}>
              <div className="rating-picker-row">
                <span className="rate-label">Your Film Score:</span>
                <div className="star-buttons-group">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      className={`star-pick-btn ${userRating >= starVal ? 'selected' : ''}`}
                      onClick={() => setUserRating(starVal)}
                      aria-label={`Rate ${starVal} Stars`}
                    >
                      <Star size={18} fill={userRating >= starVal ? '#f59e0b' : 'none'} color="#f59e0b" />
                    </button>
                  ))}
                </div>
                <span className="star-number">{userRating} of 5 Stars</span>
              </div>

              <div className="review-textarea-wrapper">
                <textarea
                  placeholder="Write your review, cinematography critique, or film analysis..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="critique-textarea"
                  rows={3}
                />
                <button 
                  type="submit" 
                  className="submit-critique-btn"
                  disabled={!reviewText.trim()}
                >
                  <Send size={14} />
                  <span>Publish Critique</span>
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="reviews-feed">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="critique-card">
                  <img src={rev.avatar} alt={rev.author} className="reviewer-avatar" />
                  <div className="critique-body">
                    <div className="reviewer-header">
                      <div>
                        <span className="reviewer-name">{rev.author}</span>
                        <span className="reviewer-date">• {rev.date}</span>
                      </div>
                      <div className="review-stars-display">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <p className="reviewer-comment">{rev.text}</p>
                    <div className="reviewer-footer">
                      <span className="helpful-tag">Helpful ({rev.likes})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Column 3: Recommended Playlist Queue (Right) */}
        <aside className="studio-col-queue">
          <div className="studio-queue-header">
            <h4><Radio size={15} className="pulse-red" /> Director's Reel Queue</h4>
            <span className="queue-pill">{relatedVideos.length} Next</span>
          </div>

          <div className="studio-queue-list">
            {relatedVideos.map((item) => (
              <div 
                key={item.id} 
                className="studio-queue-item"
                onClick={() => onSelectVideo(item)}
              >
                <div className="queue-thumb-box">
                  <img src={item.thumbnail} alt={item.title} />
                  <span className="queue-duration">{item.duration}</span>
                  <div className="queue-hover-play">
                    <Play fill="#fff" size={16} />
                  </div>
                </div>
                <div className="queue-text-box">
                  <span className="queue-cat">{item.category}</span>
                  <h5 className="queue-title">{item.title}</h5>
                  <span className="queue-channel">{item.channel.name}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
