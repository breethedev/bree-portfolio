"use client";

import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <span className="footer__brand-text">BP</span>
            <p className="footer__tagline">Senior Frontend Engineer</p>
          </div>

          <div className="footer__links">
            <a href="#home" className="footer__link">
              Home
            </a>
            <a href="#about" className="footer__link">
              About
            </a>
            <a href="#current-project" className="footer__link">
              Projects
            </a>
            <a href="#experience" className="footer__link">
              Experience
            </a>
            <a href="#contact" className="footer__link">
              Contact
            </a>
          </div>

          <div className="footer__social">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <span className="footer__social-icon">GH</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <span className="footer__social-icon">LI</span>
            </a>
            <a href="mailto:breeana@example.com" className="footer__social-link" aria-label="Email">
              <span className="footer__social-icon">EM</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© {currentYear} Breeana Payton. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
