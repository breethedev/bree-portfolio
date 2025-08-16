"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // check if on home page
    if (pathname !== "/") {
      router.push("/");

      // wait for 100ms
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      return;
    }

    // close menu
    closeMenu();

    // scroll to the element
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__container">
        <div className="navbar__brand">
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
            BP
          </a>
        </div>

        <button
          className={`navbar__toggle ${isMenuOpen ? "navbar__toggle--active" : ""}`}
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
        </button>

        <div className={`navbar__menu ${isMenuOpen ? "navbar__menu--open" : ""}`}>
          <ul className="navbar__nav">
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
                About
              </a>
            </li>
            <li>
              <a href="#current-project" onClick={(e) => handleNavClick(e, "#current-project")}>
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => handleNavClick(e, "#experience")}>
                Experience
              </a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
