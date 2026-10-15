import React, { useState } from 'react';
import { Play, Heart, Mail, Check, ShieldCheck, Film, Globe, Sparkles } from 'lucide-react';

export default function Footer({ onCategoryClick }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-glow-bar"></div>
      
      <div className="footer-main-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="logo-icon-wrapper mini">
              <Play className="logo-icon" fill="currentColor" size={16} />
            </div>
            <span className="logo-title">CINE<span className="logo-highlight">PULSE</span></span>
          </div>
          <p className="footer-tagline">
            Next-generation 4K cinematic streaming portal powered by open-source creators and Vimeo Pro cinema filmmakers.
          </p>
          <div className="provider-badges">
            <span className="p-badge vimeo-badge">Vimeo 4K Pro</span>
            <span className="p-badge vimeo-badge">Vimeo Staff Picks</span>
            <span className="p-badge dolby-badge">Dolby 5.1 Surround</span>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Channels</h4>
          <ul className="footer-nav-list">
            <li><button type="button" onClick={() => onCategoryClick('Sci-Fi & Cinema')}>Sci-Fi & Cinema</button></li>
            <li><button type="button" onClick={() => onCategoryClick('Animation')}>3D Animation</button></li>
            <li><button type="button" onClick={() => onCategoryClick('Nature & Space')}>Nature & Space</button></li>
            <li><button type="button" onClick={() => onCategoryClick('Tech & Future')}>Tech & Future</button></li>
            <li><button type="button" onClick={() => onCategoryClick('Music & Lofi')}>Music & Lofi Beats</button></li>
          </ul>
        </div>

        {/* Tech Stack Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Platform Features</h4>
          <ul className="footer-nav-list">
            <li><span className="feature-item"><Sparkles size={14} /> Theater Ambient Glow</span></li>
            <li><span className="feature-item"><Globe size={14} /> Ultra Fast CDN Streams</span></li>
            <li><span className="feature-item"><Film size={14} /> 4K HDR Color Gamut</span></li>
            <li><span className="feature-item"><ShieldCheck size={14} /> Zero DRM Ad Interruption</span></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">Weekly Premieres</h4>
          <p className="newsletter-desc">Subscribe to receive curated Friday releases and behind-the-scenes CGI breakdowns.</p>
          
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-group">
              <Mail className="mail-icon" size={17} />
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
                id="newsletter-email-input"
              />
              <button 
                type="submit" 
                className={`newsletter-submit-btn ${subscribed ? 'success' : ''}`}
                id="newsletter-submit-btn"
              >
                {subscribed ? <Check size={16} /> : 'Join'}
              </button>
            </div>
            {subscribed && (
              <p className="subscribe-success-msg">
                ✓ You're on the VIP screening list!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p className="copyright-text">
          © {new Date().getFullYear()} CINEPULSE Streaming Engine. Crafted with <Heart size={14} className="heart-icon" fill="#f43f5e" /> for film enthusiasts.
        </p>
        <div className="footer-legal-links">
          <a href="#terms">Terms</a>
          <span className="dot-sep">•</span>
          <a href="#privacy">Privacy</a>
          <span className="dot-sep">•</span>
          <a href="#cookies">Cookies</a>
          <span className="dot-sep">•</span>
          <a href="#api">Developer API</a>
        </div>
      </div>
    </footer>
  );
}
